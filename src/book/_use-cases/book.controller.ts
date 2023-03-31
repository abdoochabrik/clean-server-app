
import { Controller, Get,Post,Body,Patch, ParseUUIDPipe,Param, Delete} from '@nestjs/common'
import { CreateBookUseCase } from './add_book/add-book.use-case';
import { CreateBookRequestDto } from './add_book/create-book-request.dto';
import { DeleteBookUseCase } from './delete_book/delete-book.use-case';
import { GetBookByIdUseCase } from './get_book_by_id/get-book-by-id.use-case';
import { PaginateBooksUseCase } from './paginate_books/paginate-books.use-case';


@Controller('/book')
export class BookController {

    constructor(private readonly createBookUseCase:CreateBookUseCase,
               private readonly deleteBookByIdUseCase:DeleteBookUseCase,
               private readonly paginateBooksUseCase:PaginateBooksUseCase,
               private readonly getBookByIdUseCase:GetBookByIdUseCase) {}

    @Post(':bookId')
    async createBook(@Param('bookId',ParseUUIDPipe) bookId:string,@Body() book:CreateBookRequestDto) {
        return  await this.createBookUseCase.createBook(bookId,book)
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
}