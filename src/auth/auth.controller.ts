import {Controller, Get, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import {AuthService} from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/validate_token')
    validateToken(@Req() req: Request, @Res() res: Response) {
        let token = req.headers.authorization;
        if (!token) {
            return res.status(401);
        }
        token = token.replace('Bearer ', '');
        if (!process.env.DATABASE_URL) {
            return res.status(500)
        }
        const token_validation = this.authService.validateToken(token)
        if (token_validation[0]) {
            return res.status(200).json(JSON.stringify(token_validation[1]))
        } else {
            return res.status(401)
        }
    }
}
