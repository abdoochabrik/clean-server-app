import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authenticationGuard } from '../authentication/_business/authentication.guard';
import { UserServiceImpl } from '../user/_business/user.service.implementation';
import { GetUserByIdUseCase } from '../user/_use-cases/get_user/get_user.use-case';
import { CoreModule } from '../_core/core.module';
import { ProfileServiceImpl } from './_business/profile.service.implementation';
import { ProfileEntity } from './_infrastructure/profile.entity';
import { ProfileRepository } from './_infrastructure/profile.repo';
import { CreateProfileUseCase } from './_use-cases/add_profile/add_profile.use-case';
import { DeleteProfileUseCase } from './_use-cases/delete_profile/delete_profile.use-case';
import { GetProfileByIdUseCase } from './_use-cases/get_profile_by_id/get-profile-by-id.use-case';
import { PaginateProfilesUseCase } from './_use-cases/paginate_profiles/paginate_profiles.use-case';
import { ProfileController } from './_use-cases/profile.controller';
import { UpdateProfilesUseCase } from './_use-cases/update_profile/update_profile.use-case';

@Global()
@Module({
    imports: [
        CoreModule,
        TypeOrmModule.forFeature([
          ProfileEntity
        ]),
    ],

    controllers: [ProfileController],
    providers: [ProfileServiceImpl,
              ProfileRepository,
              CreateProfileUseCase,
              UpdateProfilesUseCase,
              GetProfileByIdUseCase,
              PaginateProfilesUseCase,
              DeleteProfileUseCase,
              GetUserByIdUseCase,
              UserServiceImpl,
              authenticationGuard],
    exports: [ProfileRepository,GetProfileByIdUseCase,ProfileServiceImpl],
}
)

export class ProfileModule {}
