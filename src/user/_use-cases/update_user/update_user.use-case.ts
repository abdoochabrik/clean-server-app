import { Injectable,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { UserModel } from 'src/user/_business/user.model';
import { Either, MyError } from '../../../_core/_business/baseError.error';
import { UserServiceImpl } from '../../_business/user.service.implementation';
import { CreateUserRequestDto } from './create-user-request.dto';
@Injectable()
export class UpdateUserUseCase{

    constructor(private readonly userService:UserServiceImpl){}
    
    public async updateUser(id:string, user:CreateUserRequestDto): Promise<MyError | any> {

        let result =  await this.userService.update(id,user)
        console.log('use case', result)
       /* if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){
            case 400:
                throw new BadRequestException(result.value);
            case 500:
                throw new InternalServerErrorException(result.value);

           }
           
        }*/
    }
}