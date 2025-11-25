import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Config
  const config = new DocumentBuilder()
    .setTitle('Auth Service API')
    .setDescription('API documentation for authentication service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  // 🚀 Console logs
  console.log(`🚀 Auth Service running on: http://localhost:${port}`);
  console.log(`📘 Swagger available at: http://localhost:${port}/docs`);
}

bootstrap();
