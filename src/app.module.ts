import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import {AuthModule} from "./auth/auth.module";
import {UsersModule} from "./users/users.module";
import {ThrottlerGuard, ThrottlerModule} from "@nestjs/throttler";
import {APP_GUARD} from "@nestjs/core";
import {CoursesModule} from "./courses/courses.module";

@Module({
    imports: [ConfigModule.forRoot(), ThrottlerModule.forRoot({
        throttlers: [
            {
                ttl: 1000*60*10,
                limit: 100
            }
        ]
    }), AuthModule, UsersModule, CoursesModule],
    controllers: [AppController],
    providers: [{
        provide: APP_GUARD,
        useClass: ThrottlerGuard
    }],
})

export class AppModule {}