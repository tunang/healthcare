import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqProducerModule } from './rabbitmq/rabbitmq-producer.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true, // để toàn app dùng được
    }),
    RabbitmqProducerModule,
    NotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
