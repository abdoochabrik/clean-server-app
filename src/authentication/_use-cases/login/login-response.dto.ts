import { UserModel } from "../../../user/_business/user.model";


export class loginResponseDto {
    user:UserModel;
    access_token:string;

    constructor(user:UserModel,access_token:string) {
        this.user = user;
        this.access_token = access_token;
    }
}