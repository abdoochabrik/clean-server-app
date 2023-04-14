import { authenticationGuard } from "../../authentication/_business/authentication.guard";
import { CreateFileRequestDto } from "./add-file/add-file.request.dto";
import { CreateFileUseCase } from "./add-file/add-file.use-case";
import { Controller, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors, Get, Param  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from "multer";
import { GetFileByIdUseCase } from "./get-file-by-id/get-file-by-id.use-case";
import { ParseUUIDPipe } from "@nestjs/common/pipes";
import { Readable } from 'stream';
import { FileModel } from "../_business/file.model";
import { Response } from 'express';
import { StreamableFile } from "@nestjs/common/file-stream";
import { ClassSerializerInterceptor } from "@nestjs/common/serializer";

//@UseGuards(authenticationGuard)
@Controller('/file')
export class FileController { 

    constructor(private readonly createFileUseCase:CreateFileUseCase,
                private readonly getFileByIdUseCase:GetFileByIdUseCase){}

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    public async createFile(@UploadedFile() file:Multer.File) {
        return await this.createFileUseCase.createFile(file.buffer,file.originalname)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    public async getFileById(@Param('id',ParseUUIDPipe) fileId:string,@Res({ passthrough: true }) response: Response) {
     const file = await this.getFileByIdUseCase.getFileById(fileId) as FileModel;
     const stream = Readable.from(file.data);
     response.set({
        'Content-Disposition': `inline; filename="${file.filename}"`,
        'Content-Type': 'image'
      })
      return new StreamableFile(stream);  
    }
 
    

}