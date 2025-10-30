import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // TODO: Initialize NestJS application
  const app = await NestFactory.create(AppModule);

  // TODO: Configure CORS
  // app.enableCors();

  // TODO: Configure global pipes, filters, interceptors
  // app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();

