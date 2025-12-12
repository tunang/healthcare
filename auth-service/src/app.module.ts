import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from './common/rabbitmq.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // để toàn app dùng được
    }),
    UsersModule,
    AuthModule,
    OtpModule,
    DatabaseModule,
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
