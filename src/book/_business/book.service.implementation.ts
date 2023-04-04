import { Injectable } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { Either, left, MyError, right } from "../../_core/_business/baseError.error";
import { BookEntity } from "../_infrastructure/book.entity";
import { BookRepository } from "../_infrastructure/book.repo";
import { BookModel } from "./book.model";
import { BookServiceInterface } from "./book.service.abstraction";

@Injectable()
export class BookServiceImplementation implements BookServiceInterface  {

    constructor(private readonly bookRepository:BookRepository){}

    async create(book: BookModel): Promise<Either<MyError, BookModel>> {
        try {
            let createdBook:BookEntity = await this.bookRepository.createEntity(book);
            return right(createdBook);
        } catch (error) {
            if(error.code == 23505){
                return left(MyError.createError(HttpStatus.BAD_REQUEST,'data already exist','you can not create many books with same informations',new Date(),`/api/user`));
            }
            else {
                return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level',new Date(),`/api/user`))
            }
        }
    }
    public async deleteById(bookId: string): Promise<Either<MyError, boolean>> {
        try {
            const result = await this.bookRepository.deleteEntityById(bookId);
            const {affected,raw} = result;
            if(raw.at(0) !== null ) {
                return right(!!affected)
            }
            else  {
                return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this book',new Date(),`/api/book/${bookId}`))
            }
            
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
        }
    }

    async getById(id: string): Promise<Either<MyError, BookModel>> {
        try {
            const book:BookModel = await this.bookRepository.getEntityById(id);
            if(book) {
                return right(book)
            }
            else {
                return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this book',new Date(),`/api/book/${id}`))
            }
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
        }
   
    }

    async getAll(): Promise<Either<MyError, BookModel[]>> {
        try {
            const books:BookModel[] = await this.bookRepository.paginateEntities(); 
            return right(books)
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level',new Date(),`/api/books`))
        }
    }
    
    public async update(id: string, book: BookModel): Promise<Either<MyError, BookModel>> {
    
        const foundBook:BookEntity = await this.bookRepository.getEntityById(id)
        if(!foundBook) {
            return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this book',new Date(),`/api/book/${id}`))
        }
        try {
            const result = await this.bookRepository.updateBook(id,book)
            const {raw} = result;
            if(raw.at(0) !== null ) {
                return right(raw[0]);
            }
            else  {
                return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this book',new Date(),`/api/book/${id}`))
            }
            
        } catch (error) {

                return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
            
        }
    }

    
   
}