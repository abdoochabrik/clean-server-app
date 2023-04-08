import { UserModel } from "src/user/_business/user.model";
import { Either, MyError } from "src/_core/_business/baseError.error";
import { authenticationServiceAbstraction } from "./authentication.service.abstraction";



export class authenticationService implements authenticationServiceAbstraction {
    getUserByUsername(username: string, password: string): Promise<Either<UserModel, MyError>> {
        throw new Error("Method not implemented.");
    }

  
}