import {Controller, Get, HttpException, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {AuthService} from "../auth.service";

@Controller("/auth/via")
export class AuthViaController {
    constructor(private readonly authService: AuthService) {}

    @Get('/password/login')
    async passwordLogin(@Req() req: Request, @Res() res: Response) {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Basic ")) {
            throw new HttpException("Bad Request", 400)
        }
        let auth: string[];
        try {
            auth = atob(req.headers.authorization.replace("Basic ", "")).split(";")
        } catch (_) {
            throw new HttpException("Incorrect email or password", 401)
        }

        const email = auth[0]
        const password = auth.slice(1).join(";")
        if (!email || !password) {
            throw new HttpException("Incorrect email or password", 401)
        }

        const [validation, userData] = await this.authService.validatePassword(email, password)
        if (!validation || !userData) {
            throw new HttpException("Incorrect email or password", 401)
        }
        const tokenData = {
            "scope": userData["scopes"],
            "user_id": userData["user_id"]
        };
        const token = this.authService.generateToken(JSON.stringify(tokenData), 1000*60*60*24*2);
        return res
            .status(200)
            // .cookie("access_token", token, {
            //     maxAge: 1000*60*60*24*2,
            //     sameSite: "lax"
            // })
            .json(token);
    }
}