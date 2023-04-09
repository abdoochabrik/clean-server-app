import { Injectable, InternalServerErrorException, NotFoundException,UnauthorizedException } from "@nestjs/common";
import { UserModel } from "../../../user/_business/user.model";
import { MyError } from "../../../_core/_business/baseError.error";
import { authenticationService } from "../../_business/authetication.service";
import { loginRequestDto } from "./login-request.dto";

@Injectable()
export class loginUseCase {
 
    constructor(private readonly authenticationService:authenticationService){}

    public async login(userInfo:loginRequestDto):Promise<UserModel | MyError> {
         const result = await this.authenticationService.getUserByEmail(userInfo.email,userInfo.password);
         if(result.isLeft()) {
            const {password, ...rest} = result.value
            if(password != userInfo.password){
                throw new UnauthorizedException();
            }
            return rest
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
