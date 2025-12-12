// src/common/rabbitmq.module.ts (Gộp chung vào 1 file cho gọn)
import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

interface RmqModuleOptions {
  name: string;  // Tên token để inject (VD: 'AUTH_SERVICE')
  queue: string; // Tên queue (VD: 'auth_queue')
}

@Global()
@Module({})
export class RmqModule {
  // Hàm này giúp Module "động", nhận tham số từ bên ngoài
  static register({ name, queue }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [
        ClientsModule.register([
          {
            name: name,
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://admin:admin@localhost:5672'], // Nên lấy từ env
              queue: queue,
              queueOptions: {
                durable: true,
              },
            },
          },
        ]),
      ],
      exports: [ClientsModule], // Export để module khác dùng được
    };
  }
}