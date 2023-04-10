import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "../../_core/_infrastructure/base.repo";
import { Repository } from "typeorm";
import { RoleEntity } from "./role.entity";


@Injectable()
export class RoleRepository extends BaseRepository<RoleEntity> {


    constructor( @InjectRepository(RoleEntity)
    private readonly profileRepository: Repository<RoleEntity>){
        super(profileRepository)
    }
}