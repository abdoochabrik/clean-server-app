
import { Controller, Get,Post,Body, ParseUUIDPipe,Param, Delete} from '@nestjs/common'
import { MyError } from '..//../_core/_business/baseError.error';
import { ProfileModel } from '../_business/profile.model';
import { CreateProfileUseCase } from './add_profile/add_profile.use-case';
import { CreateProfileRequestDto } from './add_profile/create-profile_request.dto';
import { DeleteProfileUseCase } from './delete_profile/delete_profile.use-case';
import { PaginateProfilesUseCase } from './paginate_profiles/paginate_profiles.use-case';

@Controller('/profile')
export class ProfileController {

    constructor(private readonly createProfileUseCas:CreateProfileUseCase,
                private readonly paginateProfilesUseCase:PaginateProfilesUseCase,
                private readonly deleteProfilesUseCase:DeleteProfileUseCase){}

    @Post(':id')
    public async createProfile(@Param('id',ParseUUIDPipe) userId:string, @Body() profile:CreateProfileRequestDto) : Promise<MyError | ProfileModel> {
        return await this.createProfileUseCas.createUser(userId,profile);
    }

    @Get()
    public async paginateProfiles(): Promise<MyError | ProfileModel[]> {
        return await this.paginateProfilesUseCase.paginateUsers();
    }

    @Delete(':id')
    public async deleteProfile(@Param('id',ParseUUIDPipe) profileId:string) {
       return await this.deleteProfilesUseCase.deleteProfile(profileId)
    }
}