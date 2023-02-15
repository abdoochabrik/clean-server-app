import { BaseModel } from "src/_core/_business/base.model";

export interface User extends BaseModel {
    username: string;
    password: string;
}