import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { BaseRepository } from '../../_core/_infrastructure/base.repo';
import {UpdateResult} from '../../_core/_business/base.types'

@Injectable()
export class BookRepository extends BaseRepository<BookEntity> {

    constructor( @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>){
        super(bookRepository)
    }

    public async getEntityById(entityId: string): Promise<BookEntity | null> {
        return await this.bookRepository.findOne({where : { 'id': entityId}, relations: {
            profile: true,
            image:true
        },})
    }

    
    public async updateBook(id:string,book:Partial<BookEntity>):Promise<UpdateResult<BookEntity>> {
        const updateResult = await this.bookRepository.update(id,{...book});
        const {affected}=updateResult
        const foundbook = await this.bookRepository.findOne({ where: { 'id' : id }})
        const result = new UpdateResult<BookEntity>(affected,[foundbook])
        return result;
     }

 }