import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Either, left, MyError, right } from "../../_core/_business/baseError.error";
import { SecretRepository } from "../_infrastructure/secret.repo";
import { SecretModel } from "./secret.model";
import { SecretServiceInterface } from "./secretservice.abstraction";
import { HttpStatus } from '@nestjs/common';


@Injectable()
export class SecretServiceImpl implements SecretServiceInterface {

    constructor(private readonly secretRepo:SecretRepository){}

    public async create(secret: SecretModel): Promise<Either<MyError, SecretModel>> {
        try {
            const createdSecret:SecretModel = await this.secretRepo.createEntity(secret)
            return right(createdSecret)
        } catch (error) {
            if(error.code == 23505){
                return left(MyError.createError(HttpStatus.BAD_REQUEST,'secret type already exist','you can not create two secrets with same type',new Date(),`/api/secret`));
            }
            else {
                return left(MyError.createError(HttpStatus.INTERNAL_SERVER_ERROR,'internal problem','unkown problem on the database level',new Date(),`/api/secret`))
            }
        }
    }

    deleteById(id: string): Promise<Either<MyError, boolean>> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Either<MyError, SecretModel>> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Either<MyError, SecretModel[]>> {
        throw new Error("Method not implemented.");
    }
    update(id: string, R: SecretModel): Promise<Either<MyError, SecretModel>> {
        throw new Error("Method not implemented.");
    }
    
}