import { Injectable,BadRequestException,InternalServerErrorException,NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/_infrastructure/user.entity';
import { MyError } from '../../../_core/_business/baseError.error';
import { UserServiceImpl } from '../../_business/user.service.implementation';
@Injectable()
export class GetUserByIdUseCase{

    constructor(private readonly userService:UserServiceImpl){}
    
    public async getUserById(userId:string): Promise<MyError | UserEntity> {

        const result =  await this.userService.getById(userId)
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