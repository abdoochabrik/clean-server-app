import { Injectable,InternalServerErrorException } from '@nestjs/common';
import { UserModel } from 'src/user/_business/user.model';
import { MyError } from '../../../_core/_business/baseError.error';
import { UserServiceImpl } from '../../_business/user.service.implementation';
@Injectable()
export class PaginateUsersUseCase{

    constructor(private readonly userService:UserServiceImpl){}
    
    public async paginateUsers(): Promise<MyError | UserModel[]> {

        const result =  await this.userService.getAll()
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){  
            default:
                throw new InternalServerErrorException(result.value);
           }
           
        }
    }
}