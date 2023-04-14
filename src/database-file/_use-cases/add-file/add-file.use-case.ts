import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { rmSync } from "fs";
import { FileModel } from "../../../database-file/_business/file.model";
import { FileServiceImplementation } from "../../../database-file/_business/file.service.implementation";
import { MyError } from "../../../_core/_business/baseError.error";
import { CreateFileRequestDto } from "./add-file.request.dto";

@Injectable()
export class CreateFileUseCase {

   constructor(private readonly fileService:FileServiceImplementation){}
   
   public async createFile(image:Buffer,filename:string):Promise<MyError | FileModel> {
        const result = await this.fileService.createFile(image,filename);
        if(result.isRight()){
            return result.value          
        }

        else if(result.isLeft()){
            switch(result.value.code){
                case 400:
                    throw new BadRequestException(result.value);
                default:
                    throw new InternalServerErrorException(result.value);
               }
        }
   }
}