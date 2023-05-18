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
import { RoleModule } from './role/role.module';
import { RoleEntity } from './role/_infrastructure/role.entity';
import { DatabaseFileModule } from './database-file/database-file.module';
import { SecretModule } from './secret/secret.module';
import FileEntity from './database-file/_infrastructure/file.entity';
import { SecretEntity } from './secret/_infrastructure/secret.entity';

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
          BookEntity,
          RoleEntity,
          FileEntity,
          SecretEntity
        ],
        synchronize: true
      })
    }),UserModule, ProfileModule, BookModule, AuthenticationModule, RoleModule, DatabaseFileModule, SecretModule],
  providers: []
})
export class AppModule {}
