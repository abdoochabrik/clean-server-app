
import { Injectable } from '@nestjs/common';
import { UserServiceInterface } from './user.service.abstraction';
@Injectable()
export class UserServiceImpl implements UserServiceInterface {
    public getUser(userId:string):string {
       return `${userId}`
    }
    deleteUser(userId:string):string {
        return `get user ${userId}`
    }
    addUser(userId:string):string {
        return `get user ${userId}`
    }
    updateUser(userId:string):string {
        return `get user ${userId}`
    }
}