import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { FileModel } from "../../../database-file/_business/file.model";
import { FileServiceImplementation } from "../../../database-file/_business/file.service.implementation";
import { MyError } from "src/_core/_business/baseError.error";


@Injectable()
export class GetFileByIdUseCase {

    constructor(private readonly fileService:FileServiceImplementation){}

    public async getFileById(fileId:string):Promise<MyError | FileModel> {
        const result = await this.fileService.getById(fileId);
        if(result.isRight()){
            return result.value
        }
        else if(result.isLeft()){
            switch(result.value.code) {
                case 404:
                throw new NotFoundException(result.value);
            default:
                throw new InternalServerErrorException(result.value);      
            }
        }
        }
}