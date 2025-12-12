import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';
import { OtpModule } from 'src/otp/otp.module';
import { RmqModule } from 'src/common/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'afsdfasdfasdfasdfasdf', // move to env later
      signOptions: { expiresIn: '1h' },
    }),
    OtpModule,
    RmqModule.register({
      name: 'AUTH_SERVICE',
      queue: 'auth_queue',
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
