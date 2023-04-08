import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Either, right,MyError, left } from '../../_core/_business/baseError.error';
import { UserEntity } from '../_infrastructure/user.entity';
import { UserRepository } from '../_infrastructure/user.repo';
import { UserModel } from './user.model';
import { UserServiceInterface } from './user.service.abstraction';
@Injectable()
export class UserServiceImpl implements UserServiceInterface {

    constructor(private readonly userRepository:UserRepository){}

    async deleteById(id: string): Promise<Either<MyError,boolean>> {
        try {
            const result = await this.userRepository.deleteEntityById(id)
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
            const user = await this.userRepository.getEntityById(id)
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
            const users:UserModel[] = await this.userRepository.paginateEntities()
            return right(users);
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
        }
    }
    
    async update(id: string, user: UserModel): Promise<Either<MyError,UserEntity>> {
        const foundUser:UserEntity = await this.userRepository.getEntityById(id)
        if(!foundUser) {
            return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this user',new Date(),`/api/user/${id}`))
        }
        try {
            const result = await this.userRepository.updateUser(id,user);
            const {raw} = result;
            if(raw.at(0) !== null ) {
                return right(raw[0]);
            }
            else  {
                return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this user',new Date(),`/api/user/${id}`))
            }
            
        } catch (error) {
            if(error.code == 23505){
                return left(MyError.createError(HttpStatus.BAD_REQUEST,'email or username already exist','you can not create two users with same email or username',new Date(),`/api/user`));
            } 
            else {
                return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
            }
        }
    }

   async create(user: UserModel): Promise<Either<MyError,UserModel>> {
        try {
            const savedUser:UserModel =  await this.userRepository.createEntity(user)
            return right(savedUser);
          } catch (error) {
            if(error.code == 23505){
                return left(MyError.createError(HttpStatus.BAD_REQUEST,'email or username already exist','you can not create two users with same email or username',new Date(),`/api/user`));
            }
            else {
                return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level',new Date(),`/api/user`))
            }
            }
          
          } 

     async getUserByEmail(email:string):Promise<Either<UserModel,MyError>> {
       try {
          const user:UserModel = await (await this.userRepository.createQueryBuilder())
                                    .where("user.email = :email",{email:email})
                                    .getOne()
          if(user) {
            return left(user)
          }
          else {
            return right(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this user',new Date(),`/api/user`))
         }
       } catch (error) {
        return right(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
       }
     }     
}

