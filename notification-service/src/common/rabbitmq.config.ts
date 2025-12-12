// src/common/rabbitmq.config.ts (hoặc giữ tên class cũ của bạn)
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

export class RmqConfig {
  // Thêm tham số queueName vào hàm
  static getOptions(queueName: string): MicroserviceOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://admin:admin@localhost:5672'],
        queue: queueName, // Dùng biến truyền vào
        queueOptions: {
          durable: true,
        },
        // noAck: false, // Bật cái này nếu muốn manual acknowledge
      },
    };
  }
}