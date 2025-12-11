import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto);
  }

  @GrpcMethod('AuthService', 'ValidateUser') // Tên Service và RPC trong file .proto
  async validateUser(data: { id: number; role: string }): Promise<{isValid: boolean }> {
    const isValid = await this.auth.validateUserById(data);
    return { isValid };
  }
}
