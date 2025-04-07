import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}


}
