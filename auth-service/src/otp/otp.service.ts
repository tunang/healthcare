import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOtpDto } from './dto/create-otp.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Otp } from './entities/otp.entity';
import { Repository } from 'typeorm';
import { User, UserStatus } from 'src/users/entities/user.entity';
import { verifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private otpRepo: Repository<Otp>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async generateOtp(dto: CreateOtpDto) {
    // 1. Check if user exists
    const { email } = dto;
    const user = await this.userRepo.findOne({ where: { email }});
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

    return { otp: otp, message: 'OTP sent successfully' };
  }

  async verifyOtp(dto: verifyOtpDto) {
    const {code, email} = dto;

    // Check if user exist
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    // Find otp by userId + code (latest)
    const otp = await this.otpRepo.findOne({
      where: { userId: user.id, code, used: false },
      order: { createdAt: 'DESC' },
    });

    if (!otp) {
      throw new BadRequestException('Invalid OTP');
    }

    // Check expired
    if (otp.expiresAt < new Date()) {
      throw new BadRequestException('OTP expired');
    }

    // Mark OTP as used
    otp.used = true;
    await this.otpRepo.save(otp);

    // Activate user
    user.status = UserStatus.ACTIVE;
    await this.userRepo.save(user);

    return {
      message: 'User verified successfully',
    };
  }
}
