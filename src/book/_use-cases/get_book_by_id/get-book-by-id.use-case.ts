import {Injectable,NotFoundException,InternalServerErrorException} from '@nestjs/common';
import { MyError } from "../../../_core/_business/baseError.error";
import { BookModel } from "src/book/_business/book.model";
import { BookServiceImplementation } from "src/book/_business/book.service.implementation";

@Injectable()
export class GetBookByIdUseCase{

    constructor(private readonly bookService:BookServiceImplementation){}

    public async getProfileById(id:string):Promise<MyError | BookModel> {
        const result = await this.bookService.getById(id)
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()) {
            switch(result.value.code) {
                case 404:
                throw new NotFoundException(result.value);
            default:
                throw new InternalServerErrorException(result.value);      
            }
        }
    }
 }