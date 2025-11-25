import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
  @ApiProperty()
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;
}
