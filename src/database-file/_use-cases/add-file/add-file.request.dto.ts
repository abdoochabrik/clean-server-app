import { IsNotEmpty, IsOptional} from "class-validator";

export class CreateFileRequestDto {

    @IsOptional()
    filename?: string;

    @IsNotEmpty()
    data?: Uint8Array;

}