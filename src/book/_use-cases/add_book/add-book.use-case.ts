import { Injectable,BadRequestException,InternalServerErrorException } from '@nestjs/common';
import { ProfileModel } from 'src/profile/_business/profile.model';
import { MyError } from '../../../_core/_business/baseError.error';
import { BookServiceImplementation } from 'src/book/_business/book.service.implementation';
import { BookModel } from 'src/book/_business/book.model';
import { CreateBookRequestDto } from './create-profile-request.dto';
import { GetProfileByIdUseCase } from 'src/profile/_use-cases/get_profile_by_id/get-profile-by-id.use-case';
@Injectable()
export class CreateBookUseCase{

    constructor(private readonly bookService:BookServiceImplementation, 
                private readonly getProfileByIdCase:GetProfileByIdUseCase){}
    
    public async createUser(profileId:string, book:CreateBookRequestDto): Promise<MyError | BookModel> {

        const profile:ProfileModel = await this.getProfileByIdCase.getProfileById(profileId) as ProfileModel;
        
        const bookToCreate:BookModel = {
            name: book.name,
            nbrPage: book.nbrPage,
            profile: profile
        }

        const result =  await this.bookService.create(bookToCreate)
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