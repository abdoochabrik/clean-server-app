
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/_core/_business/base.service';
import { UserEntity } from '../_infrastructure/user.entity';
import { UserRepository } from '../_infrastructure/user.repo';
import { UserModel } from './user.model';
import { UserServiceInterface } from './user.service.abstraction';
@Injectable()
export class UserServiceImpl implements UserServiceInterface {

    constructor(private readonly userRepository:UserRepository){}

    deleteById(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    getById(id: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    getAll(): Promise<UserModel[]> {
        throw new Error('Method not implemented.');
    }
    
    update(id: string, R: UserModel): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }

    async create(user: UserModel): Promise<UserEntity> {
        return await this.userRepository.createUser(user);
    }

}