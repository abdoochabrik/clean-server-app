import { Injectable,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { UserModel } from 'src/user/_business/user.model';
import { Either, MyError } from '../../../_core/_business/baseError.error';
import { UserServiceImpl } from '../../_business/user.service.implementation';
@Injectable()
export class PaginateUsersUseCase{

    constructor(private readonly userService:UserServiceImpl){}
    
    public async paginateUsers(): Promise<MyError | UserModel[]> {

        let result =  await this.userService.getAll()
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){
            case 500:
                throw new InternalServerErrorException(result.value);   
            default:
                throw new InternalServerErrorException(result.value);
           }
           
        }
    }
}