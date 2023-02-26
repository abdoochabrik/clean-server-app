import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../_core/core.module';
import { UserServiceImpl } from '../user/_business/user.service.implementation';
import { UserEntity } from './_infrastructure/user.entity';
import { UserRepository } from './_infrastructure/user.repo';
import { CreateUserUseCase } from './_use-cases/add_user/add_user.use-case';
import { UserController } from './_use-cases/user.controller';
import { DeleteUserUseCase } from './_use-cases/delete_user/delete_user.use-case';
import { GetUserByIdUseCase } from './_use-cases/get_user/get_user.use-case';
import { PaginateUsersUseCase } from './_use-cases/paginate_users/paginate_users.use-case';
import { UpdateUserUseCase } from './_use-cases/update_user/update_user.use-case';
@Global()
@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  controllers: [UserController],
  providers: [UserServiceImpl,
              UserRepository,
              CreateUserUseCase,
              DeleteUserUseCase,
              PaginateUsersUseCase,
              GetUserByIdUseCase,
              UpdateUserUseCase],
  exports: [],
})
export class UserModule {}
