import { Injectable } from '@nestjs/common';
import { UserModel } from 'src/user/_business/user.model';
import { UserServiceImpl } from '../../_business/user.service.implementation';
import { CreateUserRequestDto } from './create-user-request.dto';
@Injectable()
export class CreateUserUseCase{

    constructor(private readonly userService:UserServiceImpl){}
    
    public async createUser(user:CreateUserRequestDto) {
        let userToCreate:UserModel = {
            username: user.username,
            email: user.email,
            password: user.password,
        }

        return await this.userService.create(userToCreate)
    }
}