
import { Controller, Get,Post,Body} from '@nestjs/common'
import { MyError } from '../../_core/_business/baseError.error';
import { SecretModel } from '../_business/secret.model';
import { CreateSecretUseCase } from './add-secret/add-secret.use-case';
import { CreateSecretRequestDto } from './add-secret/create-secret-request.dto';
import { GetSecretRequestDto } from './get-secret/get-secret.request.dto';
import { GetSecretUseCase } from './get-secret/get-secret.use-case';

@Controller('/secret')
export class SecretController {
    constructor(private readonly createSecretUseCase:CreateSecretUseCase, 
                private readonly getSecretByTypeUseCase:GetSecretUseCase,){}

    @Post('')
    public async createSecret(@Body() secret:CreateSecretRequestDto):Promise<MyError | SecretModel> {
        return await this.createSecretUseCase.createSecret(secret)

    }

    @Get('')
    public async getSecretByType(@Body() type:GetSecretRequestDto):Promise<MyError | SecretModel>{
      return await this.getSecretByTypeUseCase.getSecretByType(type)
    }

}