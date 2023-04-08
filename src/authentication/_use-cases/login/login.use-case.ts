import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UserModel } from "../../../user/_business/user.model";
import { MyError } from "../../../_core/_business/baseError.error";
import { authenticationService } from "../../_business/authetication.service";

@Injectable()
export class loginUseCase {
 
    constructor(private readonly authenticationService:authenticationService){}

    public async login(email:string):Promise<UserModel | MyError> {
         const result = await this.authenticationService.getUserByEmail(email);
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
