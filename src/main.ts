import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: `${process.env.MAIN_HOSTNAME}`,
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// TODO: enable https, https only for auth routes
