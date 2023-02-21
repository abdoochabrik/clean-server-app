import { Either } from 'src/_core/_business/baseError.error';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
@Injectable()
export class UserRepository{
    constructor( @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>){}

    public async createUser(user:UserEntity):Promise<UserEntity> {
       return await this.userRepository.save(user)
    }

 }