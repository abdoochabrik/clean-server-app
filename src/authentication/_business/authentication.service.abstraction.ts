import { UserModel } from "../../user/_business/user.model";
import { Either, MyError } from "../../_core/_business/baseError.error";


export interface authenticationServiceAbstraction {
   getUserByEmail(email:string):Promise<Either<UserModel,MyError>>
}