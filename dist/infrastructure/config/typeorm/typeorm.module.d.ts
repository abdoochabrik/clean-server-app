import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
export declare const getTypeOrmModuleOptions: (configService: ConfigService) => TypeOrmModuleOptions;
export declare class TypeOrmConfigModule {
}
