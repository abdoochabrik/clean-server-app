import { BaseModel } from "src/_core/_business/base.model";
import { BaseService } from "src/_core/_business/base.service";

export interface UserServiceInterface {
    getUser(id:string):string;
    deleteUser(id:string):string;
    addUser(id:string):string;
    updateUser(id:string):string;
}