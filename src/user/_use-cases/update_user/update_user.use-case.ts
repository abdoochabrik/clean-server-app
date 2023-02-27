import { Injectable,NotFoundException,InternalServerErrorException } from '@nestjs/common';
import { UserModel } from 'src/user/_business/user.model';
import { MyError } from '../../../_core/_business/baseError.error';
import { UserServiceImpl } from '../../_business/user.service.implementation';
import { UpdateUserRequestDto } from './update-user-request.dto';
@Injectable()
export class UpdateUserUseCase{

    constructor(private readonly userService:UserServiceImpl){}
    
    public async updateUser(id:string, user:UpdateUserRequestDto): Promise<MyError | UserModel> {

        let result =  await this.userService.update(id,user)
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