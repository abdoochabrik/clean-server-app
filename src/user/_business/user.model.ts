import { BaseModel } from "src/_core/_business/base.model";

export interface UserModel extends BaseModel {
   // id:string,
    username: string;
    email: string;
    password: string;
    isConnected?:boolean;
}