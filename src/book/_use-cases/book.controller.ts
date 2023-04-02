
import { Controller, Get,Post,Body,Patch, ParseUUIDPipe,Param, Delete} from '@nestjs/common'
import { CreateBookUseCase } from './add_book/add-book.use-case';
import { CreateBookRequestDto } from './add_book/create-book-request.dto';
import { DeleteBookUseCase } from './delete_book/delete-book.use-case';
import { GetBookByIdUseCase } from './get_book_by_id/get-book-by-id.use-case';
import { PaginateBooksUseCase } from './paginate_books/paginate-books.use-case';
import { UpdateBookRequestDto } from './update_book/update-book.dto';
import { UpdateBookUseCase } from './update_book/update-book.use-case';


@Controller('/book')
export class BookController {

    constructor(private readonly createBookUseCase:CreateBookUseCase,
               private readonly deleteBookByIdUseCase:DeleteBookUseCase,
               private readonly paginateBooksUseCase:PaginateBooksUseCase,
               private readonly getBookByIdUseCase:GetBookByIdUseCase,
               private readonly updateBookUseCase:UpdateBookUseCase) {}

    @Post(':bookId')
    async createBook(@Param('bookId',ParseUUIDPipe) profileId:string,@Body() book:CreateBookRequestDto) {
        return  await this.createBookUseCase.createBook(profileId,book)
    }

    @Delete(':bookId')
    async deleteBook(@Param('bookId',ParseUUIDPipe) bookId:string) {
        return  await this.deleteBookByIdUseCase.deleteBook(bookId)
    }

    @Get('')
    async paginateBooks() {
        return await this.paginateBooksUseCase.paginateBooks();
    }

    @Get(':bookId')
    async getBook(@Param('bookId',ParseUUIDPipe) bookId:string) {
        return  await this.getBookByIdUseCase.getBookById(bookId)
    }

    @Patch(':bookId')
    async update(@Param('bookId',ParseUUIDPipe) bookId:string,@Body() book:UpdateBookRequestDto) {
         return this.updateBookUseCase.updateBook(bookId,book)
    }
}