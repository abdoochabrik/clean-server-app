import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './../_core/core.module';
import {FileServiceImplementation } from './_business/file.service.implementation';
import FileEntity from './_infrastructure/file.entity';
import fileRepository from './_infrastructure/file.repo';

@Global()
@Module({

    imports: [
        CoreModule,
        TypeOrmModule.forFeature([
          FileEntity
        ]),
      ],
    controllers:[],
    providers:[FileServiceImplementation,fileRepository]  
})
export class DatabaseFileModule {}
