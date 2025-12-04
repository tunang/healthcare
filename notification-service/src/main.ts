import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitmqConsumerModule } from './rabbitmq/rabbitmq-consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  // Listen RabbitMQ
  app.connectMicroservice(RabbitmqConsumerModule.getRMQconfig());

  // ⭐ BẠN ĐANG THIẾU DÒNG NÀY
  await app.startAllMicroservices();
  await app.listen(port);

  // 🚀 Console logs
  console.log(`🚀 Notification Service running on: http://localhost:${port}`);
}
bootstrap();
