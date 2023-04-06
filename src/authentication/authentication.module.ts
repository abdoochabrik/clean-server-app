import { Module } from '@nestjs/common';
import { Global } from '@nestjs/common/decorators';
import { AuthenticationController } from './_use-cases/authentication.controller';

@Module({})

@Global()
@Module({
    controllers: [AuthenticationController],
})
export class AuthenticationModule {}
