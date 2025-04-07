import {Controller, Post} from "@nestjs/common";

@Controller("/auth/via")
export class AuthViaController{
    @Post('/password/login')
    passwordLogin() {
        // TODO: add to auth.service validatePassword. Don't forget salt!!!
    }
}