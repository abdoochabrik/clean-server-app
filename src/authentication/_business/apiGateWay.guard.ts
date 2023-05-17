import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { gateWayConstants } from "./constants";

@Injectable()
export class apiGateWayGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const key  = gateWayConstants.secret
        return key === request.headers.gatewaykey
    }
}