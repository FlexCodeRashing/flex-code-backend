import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from "express";

@Controller('/users')
export class UsersController {
    @Get('/me')
    getMe() {

    }
}
