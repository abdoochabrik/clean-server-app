import { IsEnum,IsNotEmpty, IsOptional } from "class-validator";
import { profileType } from "../../_business/profile.enum";


export class CreateProfileRequestDto {

    @IsOptional()
    livesIn: string;
    
    @IsNotEmpty()
    @IsEnum(profileType)
    profileType?: profileType;
}