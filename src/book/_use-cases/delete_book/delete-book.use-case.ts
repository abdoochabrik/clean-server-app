import { Injectable,InternalServerErrorException,NotFoundException } from '@nestjs/common';
import { MyError } from 'src/_core/_business/baseError.error';
import { BookServiceImplementation } from '../../_business/book.service.implementation';

@Injectable()
export class DeleteBookUseCase {
    constructor(private readonly bookService:BookServiceImplementation){}

    public async deleteBook(bookId:string):Promise<MyError | boolean> {
        const result =  await this.bookService.deleteById(bookId);
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){
            case 404:
                throw new NotFoundException(result.value);
            default:
                throw new InternalServerErrorException(result.value);
            }
           
        }
    }
}