import {Controller, Get, Req, Res} from "@nestjs/common";
import {Request, Response} from "express";
import {AuthService} from "../auth.service";

@Controller("/auth/via")
export class AuthViaController {
    constructor(private readonly authService: AuthService) {}

    @Get('/password/login')
    async passwordLogin(@Req() req: Request, @Res() res: Response) {
        if (!req.headers.authorization || !req.headers.authorization.startsWith("Basic ")) {
            return res.status(401);
        }
        let auth: string[];
        try {
            auth = atob(req.headers.authorization.replace("Basic ", "")).split(";")
        } catch (_) {
            return res.status(401);
        }
        const email = auth[0]
        const password = auth.slice(1).join(";")
        const validation = await this.authService.validatePassword(email, password)
        if (!validation) {
            return res.status(401)
        }
        const tokenData = {
            // TODO: проверить работа authService.validatePassword
        }
        const token = this.authService.generateToken(JSON.stringify(tokenData), 1000*60*60*24*2)
        return res.status(200).json(token);
    }
}