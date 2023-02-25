import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';
import {DeleteResult} from '../../_core/_business/base.types'
import { UserModel } from '../_business/user.model';
import { UserEntity } from './user.entity';
@Injectable()
export class UserRepository{
    constructor( @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>){}

    public async createUser(user:UserEntity):Promise<UserEntity> {
       return await this.userRepository.save(user)
    }

   public async deleteUser(userId:string):Promise<DeleteResult<UserEntity>> {
      const user = await this.userRepository.findOne({ where: { 'id' : userId }})
      const deleteResult = await this.userRepository.delete(userId)
      const {affected} = deleteResult
      const result = new DeleteResult<UserEntity>(affected,[user])
      return result;
   }

   public async getUserById(userId:string):Promise<UserEntity> {
      const user = await this.userRepository.findOne({ where: { 'id' : userId }})
      return user;
   }

 }