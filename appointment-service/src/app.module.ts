import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConfigModule } from '@nestjs/config';
import { AuthProducerGRPCModule } from './proto/auth-producer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // để toàn app dùng được
    }),
    DatabaseModule,
    AuthProducerGRPCModule,
    AppointmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
