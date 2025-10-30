import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 3000;
  const frontendUrl = configService.get<string>('app.frontendUrl');

  // Security middleware
  app.use(helmet());

  // CORS configuration
  app.enableCors({
    origin: frontendUrl || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip properties that don't have decorators
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties exist
      transform: true, // Automatically transform payloads to DTO instances
      transformOptions: {
        enableImplicitConversion: true, // Convert primitive types automatically
      },
    }),
  );

  // Swagger API Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Bookstore API')
    .setDescription('E-commerce bookstore RESTful API documentation')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name will be used in @ApiBearerAuth() decorator
    )
    .addTag('auth', 'Authentication endpoints')
    .addTag('books', 'Book management endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('orders', 'Order management endpoints')
    .addTag('tags', 'Tag management endpoints')
    .addTag('admin', 'Admin endpoints')
    .addTag('reports', 'Reports endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keep authorization after page refresh
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });

  await app.listen(port);
  
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║  🚀 Application is running!                                   ║
╠═══════════════════════════════════════════════════════════════╣
║  📍 Local:            http://localhost:${port.toString().padEnd(25)}║
║  📚 API Docs:         http://localhost:${port}/api/docs${' '.repeat(12)}║
║  🏥 Health Check:     http://localhost:${port}/health${' '.repeat(15)}║
║  🌐 Frontend:         ${(frontendUrl || 'Not configured').padEnd(41)}║
╚═══════════════════════════════════════════════════════════════╝
  `);
}

bootstrap();

