import { Body, Controller, Post } from "@nestjs/common";
import { UserModel } from "../..//user/_business/user.model";
import { MyError } from "../../_core/_business/baseError.error";
import { loginRequestDto } from "./login/login-request.dto";
import { loginUseCase } from "./login/login.use-case";


@Controller('/authentication')
export class AuthenticationController { 

    constructor(private readonly loginUseCase:loginUseCase){

    }

    @Post('/login')
    public async login(@Body() userInfo:loginRequestDto ):Promise<UserModel | MyError> {
        return await this.loginUseCase.login(userInfo.email);
    }

}