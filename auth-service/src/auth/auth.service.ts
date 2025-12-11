import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserStatus } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { OtpModule } from 'src/otp/otp.module';
import { OtpService } from 'src/otp/otp.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,

    @Inject('RABBITMQ_SERVICE') 
    private readonly client: ClientProxy,

    private jwt: JwtService,
    private otpService: OtpService,
  ) {}

  async register(dto: RegisterDto) {
    const existUser = await this.usersRepo.findOne({
      where: { email: dto.email },
    });
    if (existUser) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(dto.password, 10);

    const user = this.usersRepo.create({
      email: dto.email,
      password: hashed,
      status: UserStatus.PENDING,
    });

    await this.usersRepo.save(user);

    const { otp } = await this.otpService.generateOtp({ email: user.email });

    this.client.emit('send_otp', {user: user.email, otp: otp }).subscribe({
      complete: () => console.log('Producer: Message emitted!'),
      error: (err) => console.error('Producer error:', err),
    });

    return { message: 'User registered successfully' };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOne({ where: { email: dto.email } });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const accessToken = this.jwt.sign({ sub: user.id, email: user.email });

    return {
      message: 'Login successful',
      accessToken,
    };
  }

  async validateUserById(data:{ id: number; role: string }){
    const {id, role} = data
    const user = await this.usersRepo.findOneBy({ id });

    return user?.role === role
  }
}
