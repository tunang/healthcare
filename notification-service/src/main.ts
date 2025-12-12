import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RabbitmqConsumerModule } from './rabbitmq/rabbitmq-consumer.module';
import { RmqConfig } from './common/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;

  // Listen RabbitMQ
  app.connectMicroservice(RmqConfig.getOptions('auth_queue'));
  await app.startAllMicroservices();
  
  await app.listen(port);

  // 🚀 Console logs
  console.log(`🚀 Notification Service running on: http://localhost:${port}`);
}
bootstrap();
