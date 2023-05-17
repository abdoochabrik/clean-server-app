import { authenticationGuard } from "../../authentication/_business/authentication.guard";
import { CreateFileRequestDto } from "./add-file/add-file.request.dto";
import { CreateFileUseCase } from "./add-file/add-file.use-case";
import { Controller, Post, Req, Res, UploadedFile, UseGuards,Query, Body, UseInterceptors, Get, Param  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from "multer";
import { GetFileByIdUseCase } from "./get-file-by-id/get-file-by-id.use-case";
import { ParseUUIDPipe } from "@nestjs/common/pipes";
import { FileModel } from "../_business/file.model";
import { Response } from 'express';
import { ClassSerializerInterceptor } from "@nestjs/common/serializer";
import { FileFactory } from "../design-patterns/file.factory";
import { FileStrategy } from "../design-patterns/strategy";
import { getFileByIdRequestDto } from "./get-file-by-id/get-file.request.dto";
import { FileType } from "../design-patterns/file.enum";
import { apiGateWayGuard } from "../../authentication/_business/apiGateWay.guard";

@UseGuards(apiGateWayGuard)
@Controller('/file')
export class FileController { 

    constructor(private readonly createFileUseCase:CreateFileUseCase,
                private readonly getFileByIdUseCase:GetFileByIdUseCase){}

    @Post('')
    @UseInterceptors(FileInterceptor('file'))
    public async createFile(@UploadedFile() file:Multer.File,@Body() fileName:CreateFileRequestDto) {
        return await this.createFileUseCase.createFile(file.buffer,fileName.filename)
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get(':id')
    public async getFileById(@Param('id',ParseUUIDPipe) fileId:string,
                             @Query('fileType') fileType:FileType,
                             @Res({ passthrough: true }) response: Response) {
     const file = await this.getFileByIdUseCase.getFileById(fileId) as FileModel;
     const baseController:FileStrategy  =  FileFactory.getFileController(fileType);
     return baseController.returnFile(file,response)
    }
 
}