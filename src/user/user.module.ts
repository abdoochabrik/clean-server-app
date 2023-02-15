import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../_core/core.module';
import { UserServiceImpl } from './_business/user.service.implementation';
import { UserEntity } from './_infrastructure/user.entity';
import { UserController } from './_use-cases/user.controller';
@Global()
@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  controllers: [UserController],
  providers: [UserServiceImpl],
  exports: [],
})
export class UserModule {}
