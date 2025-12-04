import { Global, Module } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';

@Global()
@Module({})
export class RabbitmqConsumerModule {
  static getRMQconfig() {
    return {
      transport: Transport.RMQ, // Transport.RMQ
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: 'auth_queue',
        queueOptions: {
          durable: true,
        },
      },
    };
  }
}
