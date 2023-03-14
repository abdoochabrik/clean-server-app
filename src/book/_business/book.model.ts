import { ProfileModel } from "src/profile/_business/profile.model";
import { UserModel } from "src/user/_business/user.model";
import { BaseModel } from "src/_core/_business/base.model";

export interface BookModel extends BaseModel {
    name:string,
    nbrPage:number;
    price?:number
    profile?:ProfileModel
}