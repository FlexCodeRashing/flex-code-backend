import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {SkipThrottle} from "@nestjs/throttler";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @SkipThrottle()
    @Get("/ping")
    getHello(): string {
        return this.appService.getHello();
    }
}
