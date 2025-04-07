import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        let token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) return false;
        token = token.replace("Bearer ", "");
        const validation = this.authService.validateToken(token);
        if (!validation[0]) {
            return false;
        }
        req.user = validation[1]
        return true;
    }
}
