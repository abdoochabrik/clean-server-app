import { Module } from '@nestjs/common';
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserEntity } from './user/_infrastructure/user.entity';
import { CoreModule } from "./_core/core.module";
import { ProfileModule } from './profile/profile.module';
import { ProfileEntity } from './profile/_infrastructure/profile.entity';
import { BookModule } from './book/book.module';
import { BookEntity } from './book/_infrastructure/book.entity';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    CoreModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.POSTGRES_HOST,
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        entities: [
          UserEntity,
          ProfileEntity,
          BookEntity
        ],
        synchronize: true
      })
    }),UserModule, ProfileModule, BookModule, AuthenticationModule],
  providers: []
})
export class AppModule {}
