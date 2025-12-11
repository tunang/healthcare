import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Setup gRPC
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'auth', // Trùng với package trong file .proto
      protoPath: join(__dirname,'../../', 'src/proto/auth.proto'), // Đường dẫn tới file .proto
      url: 'localhost:50051', // Port chạy gRPC
    },
  });

  await app.startAllMicroservices();
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
