import { Controller, Post } from "@nestjs/common";


@Controller('/authentication')
export class AuthenticationController { 

    @Post('/login')
    public  login():string {
        return 'login'
    }

}