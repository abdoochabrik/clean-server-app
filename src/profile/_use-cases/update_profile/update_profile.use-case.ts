import { ProfileServiceImpl } from "../../_business/profile.service.implementation";
import {Injectable,NotFoundException,InternalServerErrorException} from '@nestjs/common';
import { MyError } from "../../../_core/_business/baseError.error";
import { ProfileModel } from "../../_business/profile.model";
import { UpdateProfileRequestDto } from "./update_profile_request_dto";

@Injectable()
export class UpdateProfilesUseCase{
    constructor(private readonly profileService:ProfileServiceImpl) {}

    public async updateProfile(id:string,profile:UpdateProfileRequestDto) : Promise<MyError | ProfileModel> {
      const result = await this.profileService.update(id,profile);
      if(result.isRight()){
         return result.value;
      }
      else if(result.isLeft()) {
        switch(result.value.code){
            case 404:
                throw new NotFoundException(result.value);
            default:
                throw new InternalServerErrorException(result.value);      
      }
    }
 }}