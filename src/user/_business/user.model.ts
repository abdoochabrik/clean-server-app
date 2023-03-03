import { ProfileModel } from "../../profile/_business/profile.model";
import { BaseModel } from "src/_core/_business/base.model";

export interface UserModel extends BaseModel {
    username?: string;
    email?: string;
    password?: string;
    isConnected?:boolean;
    profiles?:ProfileModel[]
}