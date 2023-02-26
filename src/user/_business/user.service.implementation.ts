
import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
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
            const {affected,raw} = result;
            if(raw.at(0) !== null ) {
                return right(!!affected)
            }
            else  {
                return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this user',new Date(),`/api/user/${id}`))
            }
            
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
        }
    }

    async getById(id: string): Promise<Either<MyError,UserModel>> {
        try {
            const user = await this.userRepository.getUserById(id)
            if(user) {
               return right(user) 
            }
            else {
                return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this user',new Date(),`/api/user/${id}`))
            }
           
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
        }
    }

    async getAll(): Promise<Either<MyError,UserModel[]>> {
        try {
            const users:UserModel[] = await this.userRepository.getAllUsers()
            return right(users);
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
        }
    }
    
    async update(id: string, user: UserModel): Promise<Either<MyError,any>> {
        try {
            const updatedResult = await this.userRepository.updateUser(id,user);
            console.log('updated result',updatedResult)
            return right(updatedResult)
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
        }
    }

   async create(user: UserModel): Promise<Either<MyError,UserModel>> {
        try {
            let savedUser:UserModel =  await this.userRepository.createUser(user)
            return right(savedUser);
          } catch (error) {
            console.log('error',error)
            if(error.code == 23505){
                return left(MyError.createError(HttpStatus.BAD_REQUEST,'email already exist','you can not create two users with same email',new Date(),`/api/user`));
            }
            else {
                return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level',new Date(),`/api/user`))
            }
            }
          
          } 

}

