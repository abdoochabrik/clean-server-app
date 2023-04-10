import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../_core/core.module';
import { RoleServiceImpl } from './_business/role.service.implementation';
import { RoleEntity } from './_infrastructure/role.entity';
import { RoleRepository } from './_infrastructure/role.repo';
import { CreateRoleUseCase } from './_use-cases/add-role/add-role.use-case';
import { RoleController } from './_use-cases/role.controller';

@Global()
@Module({
    imports: [
        CoreModule,
        TypeOrmModule.forFeature([
          RoleEntity
        ]),
      ],
      controllers:[RoleController],
      providers: [RoleServiceImpl,CreateRoleUseCase,RoleRepository]
})
export class RoleModule {}
