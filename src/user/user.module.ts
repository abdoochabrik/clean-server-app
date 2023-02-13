import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators/modules/global.decorator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './_infrastructure/user.entity';
import { UserController } from './_use-cases/user.controller';
@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
