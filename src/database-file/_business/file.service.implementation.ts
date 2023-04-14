import { Injectable } from "@nestjs/common";
import { Either, MyError } from "src/_core/_business/baseError.error";
import { FileModel } from "./file.model";
import { FileServiceInterface } from "./file.service.abstraction";


@Injectable()
export class FileServiceImplementation implements FileServiceInterface {
    create(file: FileModel): Promise<Either<MyError, FileModel>> {
        throw new Error("Method not implemented.");
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