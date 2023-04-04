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

    public async updateProfile(id:string,profile:Partial<ProfileEntity>):Promise<UpdateResult<ProfileEntity>> {
        const updateResult = await this.profileRepository.update(id,{...profile});
        const foundProfile = await this.profileRepository.findOne({ where: { 'id' : id }})
        const {affected}=updateResult
        const result = new UpdateResult<ProfileEntity>(affected,[foundProfile])
        return result;
     }

    public async getEntityById(entityId: string): Promise<ProfileEntity | null> {
        return await this.profileRepository.findOne({where : { 'id': entityId}, relations: {
            books: true,
        },})
    }
    
}
