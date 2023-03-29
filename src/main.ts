import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT;

  app.use(cookieParser());

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(port);
}
bootstrap();
