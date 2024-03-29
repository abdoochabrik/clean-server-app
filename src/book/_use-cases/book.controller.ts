
import { Controller, Get,Post,Body,Patch, ParseUUIDPipe,Param, Delete,UseInterceptors, UploadedFile} from '@nestjs/common'
import { UseGuards } from '@nestjs/common/decorators';
import { Role } from '../../role/_business/role.enum';
import { Roles } from '../../role/_business/roles.decorator';
import { authenticationGuard } from '../../authentication/_business/authentication.guard';
import { CreateBookUseCase } from './add_book/add-book.use-case';
import { CreateBookRequestDto } from './add_book/create-book-request.dto';
import { DeleteBookUseCase } from './delete_book/delete-book.use-case';
import { GetBookByIdUseCase } from './get_book_by_id/get-book-by-id.use-case';
import { PaginateBooksUseCase } from './paginate_books/paginate-books.use-case';
import { UpdateBookRequestDto } from './update_book/update-book.dto';
import { UpdateBookUseCase } from './update_book/update-book.use-case';
import { RolesGuard } from '../../role/_business/roles.guard';
import { Multer } from "multer";
import { FileInterceptor } from '@nestjs/platform-express';
import { BookModel } from '../_business/book.model';
import { apiGateWayGuard } from '../../authentication/_business/apiGateWay.guard';
@UseGuards(apiGateWayGuard)
@Controller('/book')
export class BookController {

    constructor(private readonly createBookUseCase:CreateBookUseCase,
               private readonly deleteBookByIdUseCase:DeleteBookUseCase,
               private readonly paginateBooksUseCase:PaginateBooksUseCase,
               private readonly getBookByIdUseCase:GetBookByIdUseCase,
               private readonly updateBookUseCase:UpdateBookUseCase) {}

    @Roles(Role.Author)
    @UseGuards(RolesGuard)
    @Post(':profileId')
    @UseInterceptors(FileInterceptor('file'))
    async createBook(@UploadedFile() file:Multer.File,
                     @Param('profileId',ParseUUIDPipe) profileId:string,
                     @Body() book:any,
                     ) {    
                     const bookToCreate = {
                        name: book.name.toString(),
                        nbrPage:parseInt(book.nbrPage),
                        price:parseInt(book.price),
                     }
        return  await this.createBookUseCase.createBook(profileId,bookToCreate,file)
    }

    @Roles(Role.Admin,Role.Author)
    @UseGuards(RolesGuard)
    @Delete(':bookId')
    async deleteBook(@Param('bookId',ParseUUIDPipe) bookId:string) {
        return  await this.deleteBookByIdUseCase.deleteBook(bookId)
    }

    @Roles(Role.Admin,Role.Author,Role.Customer)
    @Get('')
    async paginateBooks() {
        return await this.paginateBooksUseCase.paginateBooks();
    }


    @Roles(Role.Admin,Role.Author,Role.Customer)
    @Get(':bookId')
    async getBook(@Param('bookId',ParseUUIDPipe) bookId:string) {
        return  await this.getBookByIdUseCase.getBookById(bookId)
    }

    @Roles(Role.Author)
    @UseGuards(RolesGuard)
    @Patch(':bookId')
    async updateBook(@Param('bookId',ParseUUIDPipe) bookId:string,@Body() book:UpdateBookRequestDto) {
         return await this.updateBookUseCase.updateBook(bookId,book)
    }
}