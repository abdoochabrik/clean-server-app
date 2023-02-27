import { Injectable,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { UserModel } from 'src/user/_business/user.model';
import { Either, MyError } from '../../../_core/_business/baseError.error';
import { UserServiceImpl } from '../../_business/user.service.implementation';
import { CreateUserRequestDto } from './create-user-request.dto';
@Injectable()
export class CreateUserUseCase{

    constructor(private readonly userService:UserServiceImpl){}
    
    public async createUser(user:CreateUserRequestDto): Promise<MyError | UserModel> {

        const userToCreate:UserModel = {
            username: user.username,
            email: user.email,
            password: user.password,
        }

        const result =  await this.userService.create(userToCreate)
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