import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { BaseRepository } from '../../_core/_infrastructure/base.repo';

@Injectable()
export class ProfileRepository extends BaseRepository<ProfileEntity> {

    constructor( @InjectRepository(ProfileEntity)
    private readonly profileRepository: Repository<ProfileEntity>){
        super(profileRepository)
    }


 }