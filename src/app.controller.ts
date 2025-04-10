import {Controller, Get, Res} from '@nestjs/common';
import {SkipThrottle} from "@nestjs/throttler";
import {Response} from "express";

@Controller()
export class AppController {
    @SkipThrottle()
    @Get("/ping")
    getHello(@Res() res: Response) {
        return res.status(200);
    }
}
