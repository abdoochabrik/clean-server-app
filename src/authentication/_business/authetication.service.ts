import { Injectable } from "@nestjs/common";
import { UserModel } from "../..//user/_business/user.model";
import { UserServiceImpl } from "../../user/_business/user.service.implementation";
import { Either, MyError } from "../../_core/_business/baseError.error";
import { authenticationServiceAbstraction } from "./authentication.service.abstraction";


@Injectable()
export class authenticationService implements authenticationServiceAbstraction {

    constructor(private readonly userService:UserServiceImpl){

    }
    async getUserByEmail(email: string): Promise<Either<UserModel, MyError>> {
        return await this.userService.getUserByEmail(email);
    }

  
}