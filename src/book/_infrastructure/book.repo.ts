import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { BaseRepository } from '../../_core/_infrastructure/base.repo';

@Injectable()
export class BookRepository extends BaseRepository<BookEntity> {

    constructor( @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>){
        super(bookRepository)
    }

    public async getEntityById(entityId: string): Promise<BookEntity | null> {
        return await this.bookRepository.findOne({where : { 'id': entityId}, relations: {
            profile: true,
        },})
    }

 }