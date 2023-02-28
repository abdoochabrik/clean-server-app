import { Injectable,InternalServerErrorException,NotFoundException } from '@nestjs/common';
import { ProfileServiceImpl } from '../../_business/profile.service.implementation';
import { MyError } from 'src/_core/_business/baseError.error';

@Injectable()
export class DeleteProfileUseCase {
    constructor(private readonly profileService:ProfileServiceImpl){}

    public async deleteProfile(profileId:string):Promise<MyError | boolean> {
        const result =  await this.profileService.deleteById(profileId);
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){
            case 404:
                throw new NotFoundException(result.value);
            default:
                throw new InternalServerErrorException(result.value);
            }
           
        }
    }
}