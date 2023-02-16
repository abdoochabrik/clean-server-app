
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserModel } from '../_business/user.model';
import { UserEntity } from './user.entity';
@Injectable()
export class UserRepository{
    constructor( @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>){}

    public async createUser(user:UserEntity):Promise<UserEntity> {
       return await this.userRepository.save(user)
    }

 }