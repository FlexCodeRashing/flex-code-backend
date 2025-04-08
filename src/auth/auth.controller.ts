import {Controller, Get, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {Response} from "express";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    // @Get('/')
    // test(@Res() res: Response) {
    //     const tokenData = {
    //         "scope": ["default", "admin"],
    //         "user": {
    //             "id": 1
    //         }
    //     }
    //     const token = this.authService.generateToken(JSON.stringify(tokenData), 1000*60*60)
    //     return res.status(200).json(token);
    // }
}
