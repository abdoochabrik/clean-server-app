import { PartialType } from "@nestjs/mapped-types";
import { CreateBookRequestDto } from "../add_book/create-book-request.dto";


export class UpdateBookRequestDto extends PartialType(CreateBookRequestDto) {
    
}