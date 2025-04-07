import {Module} from "@nestjs/common";
import {AuthController} from "./auth.controller";
import {AuthViaController} from "./via/auth_via.controller";
import {AuthService} from "./auth.service";

@Module({
    controllers: [AuthController, AuthViaController],
    providers: [AuthService]
})

export class AuthModule {}