import { FileModel } from "src/database-file/_business/file.model";
import { ProfileModel } from "src/profile/_business/profile.model";
import { BaseModel } from "src/_core/_business/base.model";

export interface BookModel extends BaseModel {
    name?:string;
    nbrPage?:number;
    price?:number;
    profile?:ProfileModel;
    image?:FileModel;
}