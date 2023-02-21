import { BaseModel } from "./base.model";

//R means a ressource
export interface BaseService<R extends BaseModel> {
   create(R:R): Promise<R | {message:string}>;
   deleteById(id:string):Promise<boolean>;
   getById(id:string):Promise<boolean>;
   getAll():Promise<R[]>;
   update(id:string,R:R):Promise<R>;
}