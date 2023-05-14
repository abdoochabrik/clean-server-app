import { Injectable,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { RoleModel } from '../../../role/_business/role.model';
import { GetRoleByTypeUseCase } from '../../../role/_use-cases/get-role-by-type/get-Role-By-Type.use-case';
import { UserModel } from '../../../user/_business/user.model';
import { MyError } from '../../../_core/_business/baseError.error';
import { UserServiceImpl } from '../../_business/user.service.implementation';
import { CreateUserRequestDto } from './create-user-request.dto';
@Injectable()
export class CreateUserUseCase{

    constructor(private readonly userService:UserServiceImpl,
                private readonly getRoleByTypeUseCase:GetRoleByTypeUseCase ){}
    
    public async createUser(input:CreateUserRequestDto): Promise<MyError | UserModel> {

        const {role, ...userdata} = input
        const roleFromDb = await this.getRoleByTypeUseCase.getRoleByType(role) as RoleModel
        const userToCreate = {...userdata, "role":roleFromDb}

        const result =  await this.userService.create(userToCreate)
        console.log('res',result)
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){
            case 400:
                throw new BadRequestException(result.value);
            default:
                throw new InternalServerErrorException(result.value);
           }
           
        }
    }
}