import { ProfileModel } from "../../profile/_business/profile.model";
import { BaseModel } from "src/_core/_business/base.model";
import { RoleModel } from "../../role/_business/role.model";

export interface UserModel extends BaseModel {
    username?: string;
    email?: string;
    password?: string;
    isConnected?:boolean;
    profiles?:ProfileModel[];
    role?:RoleModel
}