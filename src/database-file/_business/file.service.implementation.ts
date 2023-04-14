import { HttpStatus, Injectable } from "@nestjs/common";
import { Either, left, MyError, right } from "../../_core/_business/baseError.error";
import fileRepository from "../_infrastructure/file.repo";
import { FileModel } from "./file.model";
import { FileServiceInterface } from "./file.service.abstraction";


@Injectable()
export class FileServiceImplementation implements FileServiceInterface {
    constructor(private readonly fileRepository:fileRepository){}
    create(R: FileModel): Promise<Either<MyError, FileModel>> {
        throw new Error("Method not implemented.");
    }

    public async createFile(image:Buffer,filename:string): Promise<Either<MyError, FileModel>> {
        try {
            const createdFile = await this.fileRepository.uploadFile(image,filename)
            return right(createdFile)
        } catch (error) {
            if(error.code == 23505){
                return left(MyError.createError(HttpStatus.BAD_REQUEST,'data already exist','you can not create many files with same informations',new Date(),`/api/file`));
            }
            else {
                return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level',new Date(),`/api/file`))
            }
        }
    }
    deleteById(id: string): Promise<Either<MyError, boolean>> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Either<MyError, FileModel>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Either<MyError, FileModel[]>> {
        throw new Error("Method not implemented.");
    }
    update(id: string, file: FileModel): Promise<Either<MyError, FileModel>> {
        throw new Error("Method not implemented.");
    }
    
}