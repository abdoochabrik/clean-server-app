import { Injectable,NotFoundException,InternalServerErrorException } from '@nestjs/common';
import { RoleModel } from '../../../role/_business/role.model';
import { GetRoleByTypeUseCase } from '../../../role/_use-cases/get-role-by-type/get-Role-By-Type.use-case';
import { UserModel } from '../../../user/_business/user.model';
import { MyError } from '../../../_core/_business/baseError.error';
import { UserServiceImpl } from '../../_business/user.service.implementation';
import { UpdateUserRequestDto } from './update-user-request.dto';
@Injectable()
export class UpdateUserUseCase{

    constructor(private readonly userService:UserServiceImpl, private readonly getRoleByTypeUseCase:GetRoleByTypeUseCase){}
    
    public async updateUser(id:string, input:UpdateUserRequestDto): Promise<MyError | UserModel> {
        const {role, ...userdata} = input
        const roleFromDb = await this.getRoleByTypeUseCase.getRoleByType(role) as RoleModel
        const userToUpdate = {...userdata, "role":roleFromDb}
        
        const result =  await this.userService.update(id,userToUpdate)
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){
            case 404:
                throw new NotFoundException(result.value);
            default:
                throw new InternalServerErrorException(result.value);

           }
           
        }
    }
}