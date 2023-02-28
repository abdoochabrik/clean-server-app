import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from '../../_core/_business/base.types';
import { Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';

@Injectable()
export class ProfileRepository{

    constructor( @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>){}

    public async createProfile(profile:ProfileEntity):Promise<ProfileEntity> {
            const profileEntity : ProfileEntity = {
                ...profile
            }
            return await this.profileRepository.save(profileEntity);    
    }

    public async getProfiles(): Promise<ProfileEntity[]> {
        return await this.profileRepository.find( {relations: {
            user: true,
        }})
    }

    public async deleteProfile(profileId:string) : Promise<DeleteResult<ProfileEntity>> {
        const profile = await this.profileRepository.findOne({where : {'id':profileId}})
        const result =  await this.profileRepository.delete(profileId);
        const deleteResult:DeleteResult<ProfileEntity> = new DeleteResult<ProfileEntity>(result.affected,[profile]);
        return deleteResult
    }

 }