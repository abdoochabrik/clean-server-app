import { Injectable,InternalServerErrorException } from '@nestjs/common';
import { BookModel } from 'src/book/_business/book.model';
import { MyError } from '../../../_core/_business/baseError.error';
import { BookServiceImplementation } from '../../_business/book.service.implementation';
@Injectable()
export class PaginateBooksUseCase{

    constructor(private readonly bookService:BookServiceImplementation){}
    
    public async paginateBooks(): Promise<MyError | BookModel[]> {

        const result =  await this.bookService.getAll()
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){  
            default:
                throw new InternalServerErrorException(result.value);
           }
           
        }
    }
}