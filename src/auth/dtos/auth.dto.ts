import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export interface AuthTokenResponseDto {
  accessToken: string;
  refreshToken: string;
}
export interface AuthTokenPayModel {
  sub: number;
  email: string;
}

export class SignInDto {
  @ApiProperty({
    type: String,
    description: 'User email',
    example: 'jhondoe@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    description: 'User password',
    example: '123456',
    required: true,
  })
  @IsString()
  password: string;
}
