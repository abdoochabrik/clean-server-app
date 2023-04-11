
import { Controller, Get,Post,Body,Patch, ParseUUIDPipe,Param, Delete, UseGuards} from '@nestjs/common'
import { Role } from '../../role/_business/role.enum';
import { Roles } from '../../role/_business/roles.decorator';
import { RolesGuard } from '../../role/_business/roles.guard';
import { authenticationGuard } from '../../authentication/_business/authentication.guard';
import { MyError } from '..//../_core/_business/baseError.error';
import { ProfileModel } from '../_business/profile.model';
import { CreateProfileUseCase } from './add_profile/add_profile.use-case';
import { CreateProfileRequestDto } from './add_profile/create-profile_request.dto';
import { DeleteProfileUseCase } from './delete_profile/delete_profile.use-case';
import { GetProfileByIdUseCase } from './get_profile_by_id/get-profile-by-id.use-case';
import { PaginateProfilesUseCase } from './paginate_profiles/paginate_profiles.use-case';
import { UpdateProfilesUseCase } from './update_profile/update_profile.use-case';
import { UpdateProfileRequestDto } from './update_profile/update_profile_request_dto';
@UseGuards(authenticationGuard)
@Controller('/profile')
export class ProfileController {

    constructor(private readonly createProfileUseCas:CreateProfileUseCase,
                private readonly paginateProfilesUseCase:PaginateProfilesUseCase,
                private readonly deleteProfilesUseCase:DeleteProfileUseCase,
                private readonly updateProfileUseCase:UpdateProfilesUseCase,
                private readonly getProfileByIdUseCase:GetProfileByIdUseCase){}

    @Roles(Role.Admin,Role.Author)
    @UseGuards(RolesGuard)             
    @Post(':id')
    public async createProfile(@Param('id',ParseUUIDPipe) userId:string, @Body() profile:CreateProfileRequestDto) : Promise<MyError | ProfileModel> {
        return await this.createProfileUseCas.createUser(userId,profile);
    }

    @Roles(Role.Admin,Role.Author,Role.Customer)
    @UseGuards(RolesGuard)   
    @Get()
    public async paginateProfiles(): Promise<MyError | ProfileModel[]> {
        return await this.paginateProfilesUseCase.paginateUsers();
    }

    @Roles(Role.Admin,Role.Author)
    @UseGuards(RolesGuard)   
    @Delete(':id')
    public async deleteProfile(@Param('id',ParseUUIDPipe) profileId:string) {
       return await this.deleteProfilesUseCase.deleteProfile(profileId)
    }

    @Roles(Role.Admin,Role.Author,Role.Customer)
    @UseGuards(RolesGuard)   
    @Get(':id')
    public async getProfileById(@Param('id',ParseUUIDPipe) profileId:string) {
        return await this.getProfileByIdUseCase.getProfileById(profileId);
    }

    @Roles(Role.Admin,Role.Author)
    @UseGuards(RolesGuard)   
    @Patch(':id')
    public async updateProfile(@Param('id',ParseUUIDPipe) profileId:string,@Body() profile:UpdateProfileRequestDto) {
        return await this.updateProfileUseCase.updateProfile(profileId,profile);
    }
}