import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { CreateBookRequestDto } from "src/book/_use-cases/add_book/create-book-request.dto";
import { MyError } from "src/_core/_business/baseError.error";
import { RoleModel } from "../_business/role.model";
import { CreateRoleRequestDto } from "./add-role/add-role.request.dto";
import { CreateRoleUseCase } from "./add-role/add-role.use-case";


@Injectable()
@Controller('role')
export class RoleController {
    constructor(private readonly createRoleUseCase:CreateRoleUseCase){}

    @Post('')
    public async createRole(@Body() role:CreateRoleRequestDto):Promise<MyError | RoleModel> {
        return await this.createRoleUseCase.createRole(role);
    }
}