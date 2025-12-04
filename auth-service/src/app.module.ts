import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [UsersModule, AuthModule, DatabaseModule, OtpModule, RabbitmqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
