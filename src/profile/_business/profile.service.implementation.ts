import { Injectable,HttpStatus } from '@nestjs/common';
import { Either, left, MyError, right } from '../../_core/_business/baseError.error'
import { ProfileEntity } from '../_infrastructure/profile.entity';
import { ProfileRepository } from '../_infrastructure/profile.repo';
import { ProfileModel } from './profile.model';
import { ProfileServiceInterface} from './profile.service.abstraction';

@Injectable()
export class ProfileServiceImpl implements ProfileServiceInterface {

    constructor(private readonly profileRepo:ProfileRepository){}

    public async create(profile: ProfileModel): Promise<Either<MyError, ProfileModel>> {
        try {
            const createdProfile:ProfileModel = await this.profileRepo.createEntity(profile)
            return right(createdProfile)
        } catch (error) {
            if(error.code == 23505){
                return left(MyError.createError(HttpStatus.BAD_REQUEST,'email or username already exist','you can not create two users with same email or username',new Date(),`/api/user`));
            }
            else {
                return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level',new Date(),`/api/user`))
            }
        }
    }

    public async deleteById(profileId: string): Promise<Either<MyError, boolean>> {
        try {
            const result = await this.profileRepo.deleteEntityById(profileId);
            const {affected,raw} = result;
            if(raw.at(0) !== null ) {
                return right(!!affected)
            }
            else  {
                return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this profile',new Date(),`/api/profile/${profileId}`))
            }
            
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
        }
    }

    public async getById(id: string): Promise<Either<MyError, ProfileModel>> {
        try {
            const profile:ProfileModel = await this.profileRepo.getEntityById(id);
            if(profile) {
                return right(profile)
            }
            else {
                return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this profile',new Date(),`/api/profile/${id}`))
            }
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
        }
   
    }

    public async getAll(): Promise<Either<MyError, ProfileModel[]>> {
        try {
            const profiles:ProfileModel[] = await this.profileRepo.paginateEntities(); 
            return right(profiles)
        } catch (error) {
            return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level',new Date(),`/api/user`))
        }
    }


    public async update(id: string, profile: ProfileModel): Promise<Either<MyError, ProfileModel>> {
        const foundProfile:ProfileEntity = await this.profileRepo.getEntityById(id)
        if(!foundProfile) {
            return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this profile',new Date(),`/api/profile/${id}`))
        }
        try {
            const result = await this.profileRepo.updateUser(id,profile)
            const {raw} = result;
            if(raw.at(0) !== null ) {
                return right(raw[0]);
            }
            else  {
                return left(MyError.createError(HttpStatus.NOT_FOUND,'not found','can not found this profile',new Date(),`/api/profile/${id}`))
            }
            
        } catch (error) {

                return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level'))
            
        }
    }


}

