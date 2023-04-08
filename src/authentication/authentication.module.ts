import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { UserServiceImpl } from '../user/_business/user.service.implementation';
import { authenticationService } from './_business/authetication.service';
import { AuthenticationController } from './_use-cases/authentication.controller';
import { loginUseCase } from './_use-cases/login/login.use-case';

@Module({})

@Global()
@Module({
    controllers: [AuthenticationController],
    providers: [loginUseCase,authenticationService,UserServiceImpl]
})
export class AuthenticationModule {}
