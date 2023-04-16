import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './../_core/core.module';
import {FileServiceImplementation } from './_business/file.service.implementation';
import FileEntity from './_infrastructure/file.entity';
import fileRepository from './_infrastructure/file.repo';
import { CreateFileUseCase } from './_use-cases/add-file/add-file.use-case';
import { FileController } from './_use-cases/file.controller';
import { GetFileByIdUseCase } from './_use-cases/get-file-by-id/get-file-by-id.use-case';

@Global()
@Module({

    imports: [
        CoreModule,
        TypeOrmModule.forFeature([
          FileEntity
        ]),
      ],
    controllers:[FileController],
    providers:[FileServiceImplementation,fileRepository,CreateFileUseCase,GetFileByIdUseCase], 
    exports:[FileServiceImplementation,fileRepository,CreateFileUseCase] 
})
export class DatabaseFileModule {}
