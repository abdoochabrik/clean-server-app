import { Injectable,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { ProfileModel } from '../../_business/profile.model';
import { ProfileServiceImpl } from '../../_business/profile.service.implementation';
import { MyError } from 'src/_core/_business/baseError.error';

@Injectable()
export class PaginateProfilesUseCase{

    constructor(private readonly profileService:ProfileServiceImpl){}

    public async paginateUsers(): Promise<MyError | ProfileModel[]> { 
        
        const result = await this.profileService.getAll()

        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
           switch(result.value.code){
            case 400:
                throw new BadRequestException(result.value);
            default:
                throw new InternalServerErrorException(result.value);
           }
           
        }
    }

 }
