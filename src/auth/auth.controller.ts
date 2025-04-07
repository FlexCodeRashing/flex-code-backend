import {Controller, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";
import {AuthService} from "./auth.service";

@Controller('/auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/validate_token')
    validateToken(@Req() req: Request, @Res() res: Response) {
        if (!(req["access_token"])) {
            return res.status(401);
        }
        if (!process.env.DATABASE_URL) {
            return res.status(500)
        }
        const token_validation = this.authService.validateToken(req["access_token"])
        if (token_validation[0]) {
            return res.status(200).json(JSON.stringify(token_validation[1]))
        } else {
            return res.status(401)
        }
    }
}
