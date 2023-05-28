import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { SecretType } from "../../secret/_business/secret.enum";
import { SecretServiceImpl } from "../../secret/_business/secret.service.implementation";
import { gateWayConstants } from "./constants";

@Injectable()
export class apiGateWayGuard implements CanActivate {
    constructor(private readonly secretService:SecretServiceImpl){}
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const secret = this.secretService.getSecretByType(SecretType.API_GATE_WAY_KEY)
        const key  = gateWayConstants.secret
        console.log('secret',secret)
        console.log('secret from gateway',request.headers.gatewaykey)
        console.log('equel',key +request.headers.gatewaykey)
        return key === request.headers.gatewaykey
    }
}