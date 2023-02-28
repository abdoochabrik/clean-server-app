import { UserModel } from "src/user/_business/user.model";
import { BaseModel } from "src/_core/_business/base.model";
import { profileType } from "./profile.enum";

export interface ProfileModel extends BaseModel {
    livesIn?:string,
    profileType?:profileType
    user?:UserModel
}