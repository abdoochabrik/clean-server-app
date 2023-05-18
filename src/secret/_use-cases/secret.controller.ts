
import { Controller, Get,Post,Body,Patch, ParseUUIDPipe,Param, Delete, UseGuards} from '@nestjs/common'
import { MyError } from '../../_core/_business/baseError.error';
import { SecretModel } from '../_business/secret.model';
import { CreateSecretUseCase } from './add-secret/add-secret.use-case';
import { CreateSecretRequestDto } from './add-secret/create-secret-request.dto';

@Controller('/secret')
export class SecretController {
    constructor(private readonly createSecretUseCase:CreateSecretUseCase){}

    @Post('')
    public async createSecret(@Body() secret:CreateSecretRequestDto):Promise<MyError | SecretModel> {
        return await this.createSecretUseCase.createSecret(secret)

    }

}