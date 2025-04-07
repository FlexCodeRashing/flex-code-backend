import {Module} from "@nestjs/common";
import {UsersController} from "./users.controller";
import {AuthService} from "../auth/auth.service";

@Module({
    controllers: [UsersController],
    providers: [AuthService]
})

export class UsersModule {}