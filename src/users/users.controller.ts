import {Controller, Get, Req, Res, UseGuards} from '@nestjs/common';
import {Request, Response} from "express";
import {Permission} from "../auth/permission.decorator";
import {PermissionGuard} from "../auth/permission.guard";

@Controller('/users')
export class UsersController {
    @Get('/me')
    @Permission(["admin"])
    @UseGuards(PermissionGuard)
    getMe(@Req() req: Request, @Res() res: Response) {
        const user_data = req['user']
        if (!user_data) {
            return res.status(401)
        }
        return res.status(200).json(user_data);
    }
}
