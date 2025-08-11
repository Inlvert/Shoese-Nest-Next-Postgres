import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CONSTANTS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(CONSTANTS.PORT ?? 3000);
}
bootstrap();
