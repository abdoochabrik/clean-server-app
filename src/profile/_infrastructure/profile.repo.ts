import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BaseRepository } from '../../_core/_infrastructure/base.repo';
import { UpdateResult } from '../../_core/_business/base.types';

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileEntity> {

    constructor( @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>){
        super(profileRepository)
    }

    public async updateUser(id:string,profile:Partial<ProfileEntity>):Promise<UpdateResult<ProfileEntity>> {
        const foundProfile = await this.profileRepository.findOne({ where: { 'id' : id }})
        const updateResult = await this.profileRepository.update(id,{...profile});
        const {affected}=updateResult
        const result = new UpdateResult<ProfileEntity>(affected,[foundProfile])
        return result;
     }

 }