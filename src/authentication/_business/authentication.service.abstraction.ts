import { UserModel } from "../../user/_business/user.model";
import { Either, MyError } from "../../_core/_business/baseError.error";


export interface authenticationServiceAbstraction {
   getUserByUsername(username:string,password:string):Promise<Either<UserModel,MyError>>
}