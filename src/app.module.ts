import { Module } from '@nestjs/common';
import { configService } from './config/config.service';
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig())],
  providers: []
})
export class AppModule {}
