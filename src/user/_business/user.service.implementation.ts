
import { Injectable } from '@nestjs/common';
import { Either, right,MyError, left } from '../../_core/_business/baseError.error';
import { UserRepository } from '../_infrastructure/user.repo';
import { UserModel } from './user.model';
import { UserServiceInterface } from './user.service.abstraction';
@Injectable()
export class UserServiceImpl implements UserServiceInterface {

    constructor(private readonly userRepository:UserRepository){}

    async deleteById(id: string): Promise<Either<MyError,boolean>> {
        try {
            const result = await this.userRepository.deleteUser(id);
            return right(result)
        } catch (error) {
            return left(new MyError(500,'internal problem','unkown problem on the database level'))
        }
    }

    getById(id: string): Promise<Either<MyError,UserModel>> {
        throw new Error('Method not implemented.');
    }

    getAll(): Promise<Either<MyError,UserModel[]>> {
        throw new Error('Method not implemented.');
    }
    
    update(id: string, R: UserModel): Promise<Either<MyError,UserModel>> {
        throw new Error('Method not implemented.');
    }

    async create(user: UserModel): Promise<Either<MyError,UserModel>> {
        try {
            let savedUser:UserModel =  await this.userRepository.createUser(user)
            return right(savedUser);
          } catch (error) {
            
            if(error.code == 23505){
                return left(MyError.createError(400,'email already exist','you can not create two users with same email'));
            }
            else {
                return left(MyError.createError(500,'internal problem','unkown problem on the database level'))
            }
            }
          
          } 
    }
