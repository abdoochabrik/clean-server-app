import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from '../../_core/_infrastructure/base.repo';
import {Repository} from 'typeorm';
import {DeleteResult, UpdateResult } from '../../_core/_business/base.types'
import { UserEntity } from './user.entity';
@Injectable()
export class UserRepository extends BaseRepository<UserEntity>{
   
    constructor( @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>){
      super(userRepository)
    }

   public async updateUser(id:string,user:Partial<UserEntity>):Promise<UpdateResult<UserEntity>> {
      const updateResult = await this.userRepository.update(id,{...user});
      const {affected}=updateResult
      const foundUser = await this.userRepository.findOne({ where: { 'id' : id }})
      const result = new UpdateResult<UserEntity>(affected,[foundUser])
      return result;
   }

   public async getEntityById(entityId: string): Promise<UserEntity | null> {
    return await this.userRepository.findOne({where : { 'id': entityId}, relations: {
        profiles: true,
        role:true
    },})
  }

  public async createQueryBuilder() {
    return await this.userRepository.createQueryBuilder("user")
  }

}  
