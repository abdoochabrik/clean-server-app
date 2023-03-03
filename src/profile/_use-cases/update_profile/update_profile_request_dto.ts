import { PartialType } from '@nestjs/mapped-types';
import { IsEnum,IsOptional } from 'class-validator';
import { profileType } from '../../_business/profile.enum';
import { CreateProfileRequestDto } from "../add_profile/create-profile_request.dto";

export class UpdateProfileRequestDto extends  PartialType(CreateProfileRequestDto) {

    @IsOptional()
    @IsEnum(profileType)
    profileType?: profileType;

}
