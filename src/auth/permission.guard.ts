import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from './permission.decorator';
import {AuthService} from "./auth.service";

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private reflector: Reflector, private authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest();
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) return false;
        const token = req.headers.authorization.replace("Bearer ", "");
        const validation = this.authService.validateToken(token)
        if (!validation[0] || !validation[1]) return false;
        req.user = validation[1]

        const permissions: string[] = validation[1]["scope"]
        if (!permissions) return false;
        const requiredPermissions = this.reflector.get(Permission, context.getHandler());
        if (!requiredPermissions) {
            return true;
        }

        let flag = false;
        for (let perm of requiredPermissions) {
            if (!permissions.includes(perm)) {
                flag = true;
                break;
            }
        }
        return !flag;
    }
}
