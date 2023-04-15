import { IsNotEmpty, IsOptional} from "class-validator";

export class CreateFileRequestDto {

    @IsNotEmpty()
    filename?: string;

}