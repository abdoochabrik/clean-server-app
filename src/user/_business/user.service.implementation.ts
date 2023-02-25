
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
            const {affected,raw} = result;
            if(raw.at(0) !== null ) {
                return right(!!affected)
            }
            else  {
                return left((new MyError(404,'not found','user with this id does not exist on the database')))
            }
            
        } catch (error) {
            return left(new MyError(500,'internal problem','unkown problem on the database level'))
        }
    }

    async getById(id: string): Promise<Either<MyError,UserModel>> {
        try {
            const user = await this.userRepository.getUserById(id)
            return right(user)
        } catch (error) {
            
        }
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
