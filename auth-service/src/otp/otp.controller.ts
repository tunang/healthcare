import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OtpService } from './otp.service';
import { CreateOtpDto } from './dto/create-otp.dto';
import { verifyOtpDto } from './dto/verify-otp.dto';

@Controller('otp')
export class OtpController {
  constructor(private readonly otpService: OtpService) {}

  @Post('generate')
  create(@Body() createOtpDto: CreateOtpDto) {
    return this.otpService.generateOtp(createOtpDto);
  }

  @Post('verify')
  verify(@Body() verifyOtpDto: verifyOtpDto){
    return this.otpService.verifyOtp(verifyOtpDto)
  }
}
