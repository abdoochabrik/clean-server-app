import { authenticationGuard } from "../../authentication/_business/authentication.guard";
import { CreateFileRequestDto } from "./add-file/add-file.request.dto";
import { CreateFileUseCase } from "./add-file/add-file.use-case";
import { Controller, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from "multer";
@UseGuards(authenticationGuard)
@Controller('/file')
export class FileController { 

    constructor(private readonly createFileUseCase:CreateFileUseCase){}

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    public async createFile(@UploadedFile() file:Multer.File) {
        console.log('file',file)
        return await this.createFileUseCase.createFile(file.buffer,file.originalname)
    }
}