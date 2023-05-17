import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { UseGuards } from "@nestjs/common/decorators";
import { apiGateWayGuard } from "../../authentication/_business/apiGateWay.guard";
import { CreateBookRequestDto } from "src/book/_use-cases/add_book/create-book-request.dto";
import { MyError } from "src/_core/_business/baseError.error";
import { Role } from "../_business/role.enum";
import { RoleModel } from "../_business/role.model";
import { Roles } from "../_business/roles.decorator";
import { RolesGuard } from "../_business/roles.guard";
import { CreateRoleRequestDto } from "./add-role/add-role.request.dto";
import { CreateRoleUseCase } from "./add-role/add-role.use-case";

@UseGuards(apiGateWayGuard)
@Controller('role')
export class RoleController {
    constructor(private readonly createRoleUseCase:CreateRoleUseCase){}

    @Roles(Role.Admin)
    @UseGuards(RolesGuard)
    @Post('')
    public async createRole(@Body() role:CreateRoleRequestDto):Promise<MyError | RoleModel> {
        return await this.createRoleUseCase.createRole(role);
    }


}