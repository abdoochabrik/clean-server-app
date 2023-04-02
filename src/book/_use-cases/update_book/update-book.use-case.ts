import { InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { BookModel } from "src/book/_business/book.model";
import { BookServiceImplementation } from "../../_business/book.service.implementation"

import { MyError } from "src/_core/_business/baseError.error";
import { UpdateBookRequestDto } from "./update-book.dto";


export class UpdateBookUseCase {

    constructor(private readonly bookService:BookServiceImplementation){}

    public async updateBook(id:string,book:UpdateBookRequestDto):Promise<MyError | BookModel> {
        const result = await this.bookService.update(id,book)
        if(result.isRight()) {
            return result.value
        }
        else if (result.isLeft()) {
            switch(result.value.code) {
                case 404:
                    throw new NotFoundException(result.value);
                default:
                    throw new InternalServerErrorException(result.value); 
            }
        }
    } 
}