import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { BaseRepository } from '../../_core/_infrastructure/base.repo';

@Injectable()
export class ProfileRepository extends BaseRepository<BookEntity> {

    constructor( @InjectRepository(BookEntity)
    private readonly profileRepository: Repository<BookEntity>){
        super(profileRepository)
    }

 }