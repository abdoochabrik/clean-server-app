import { Injectable,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { ProfileModel } from 'src/profile/_business/profile.model';
import { ProfileServiceImpl } from '../../_business/profile.service.implementation';
import { Either, MyError } from '../../../_core/_business/baseError.error';
import {  CreateProfileRequestDto } from './create-profile_request.dto';
import { GetUserByIdUseCase } from '../../../user/_use-cases/get_user/get_user.use-case';
import { UserModel } from 'src/user/_business/user.model';
@Injectable()
export class CreateProfileUseCase{

    constructor(private readonly profileService:ProfileServiceImpl, private readonly getUserUseCase:GetUserByIdUseCase){}
    
    public async createUser(userId:string,profile:CreateProfileRequestDto): Promise<MyError | ProfileModel> {

        const user:UserModel = await this.getUserUseCase.getUserById(userId) as UserModel

        const profileToCreate:ProfileModel = {
            livesIn: profile.livesIn,
            profileType: profile.profileType,
            user: user
        }

        const result =  await this.profileService.create(profileToCreate);
        console.log('res',result)
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