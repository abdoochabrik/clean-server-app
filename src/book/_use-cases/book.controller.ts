
import { Controller, Get,Post,Body,Patch, ParseUUIDPipe,Param, Delete} from '@nestjs/common'
import { CreateBookUseCase } from './add_book/add-book.use-case';
import { CreateBookRequestDto } from './add_book/create-book-request.dto';


@Controller('/book')
export class BookController {

    constructor(private readonly createBookUseCase:CreateBookUseCase) {}

    @Post(':profileId')
    async createBook(@Param('profileId',ParseUUIDPipe) profileId:string,@Body() book:CreateBookRequestDto) {
        return  await this.createBookUseCase.createBook(profileId,book)
    }
}