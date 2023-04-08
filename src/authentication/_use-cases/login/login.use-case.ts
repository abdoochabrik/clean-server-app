import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserModel } from "../../../user/_business/user.model";
import { MyError } from "../../../_core/_business/baseError.error";
import { authenticationService } from "src/authentication/_business/authetication.service";

@Injectable()
export class loginUseCase {
 
    constructor(private readonly authenticationService:authenticationService){}

    public async login(username:string,password:string):Promise<UserModel | MyError> {
         const result = await this.authenticationService.getUserByUsername(username,password)
         if(result.isLeft()) {
            return result.value
         }
         else if(result.isRight()){
            switch(result.value.code) {
                case 404:
                throw new NotFoundException(result.value);
            default:
                throw new InternalServerErrorException(result.value);
           }
            }
         }
}
