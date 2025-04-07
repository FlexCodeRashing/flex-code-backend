import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import {AuthService} from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/decode_validate_token')
    decodeValidateToken(@Req() req: Request, @Res() res: Response) {
        console.log()
        return res.status(200).json(req.cookies);
    }
}
