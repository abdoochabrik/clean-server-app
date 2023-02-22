import { Injectable,BadRequestException,InternalServerErrorException,NotFoundException } from '@nestjs/common';
import { MyError } from '../../../_core/_business/baseError.error';
import { UserServiceImpl } from '../../_business/user.service.implementation';
@Injectable()
export class DeleteUserUseCase{

    constructor(private readonly userService:UserServiceImpl){}
    
    public async deleteUser(userId:string): Promise<MyError | boolean> {

        let result =  await this.userService.deleteById(userId)
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){
            case 404:
                throw new NotFoundException(result.value);
            case 500:
                throw new InternalServerErrorException(result.value);
            }
           
        }
    }
}