import { IsEnum,IsNotEmpty, IsNumber, IsOptional, IsUUID } from "class-validator";
import { ProfileModel } from "src/profile/_business/profile.model";


export class CreateBookRequestDto {

    @IsNotEmpty()
    name:string;

    @IsNotEmpty()
    //@IsNumber()
    nbrPage:number;
    @IsNotEmpty()
    //@IsNumber()
    price:number;

}