import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm/browser';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepo: Repository<Otp>,
    private userRepo: Repository<User>,
  ) {}

  async generateOtp(email: string) {
    // 1. Check if user exists
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    // 2. Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Expiry in 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 4. Save OTP with userId relation
    const otp = this.otpRepo.create({
      userId: user.id,
      code,
      expiresAt,
    });
    await this.otpRepo.save(otp);

    // 5. Send to notification service
    // await lastValueFrom(
    //   this.notificationClient.emit('user.otp', { email, otp: code }),
    // );

    return { message: 'OTP sent successfully' };
  }

  async VerifyOtp(email: string, code: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    
  }
}
