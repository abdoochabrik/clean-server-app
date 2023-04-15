import { IsNotEmpty } from "class-validator";
import { FileType } from "../../design-patterns/file.enum";

export class getFileByIdRequestDto {
    @IsNotEmpty()
    fileType:FileType;
}