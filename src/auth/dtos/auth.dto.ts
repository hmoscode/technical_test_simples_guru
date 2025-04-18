import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthTokenResponseDto {
  @ApiProperty({
    type: String,
    description: 'Access token for authentication',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;

  @ApiProperty({
    type: String,
    description: 'Refresh token for obtaining a new access token',
    example: 'dGhpcyBpcyBhIHJlZnJlc2ggdG9rZW4uLi4=',
  })
  refreshToken: string;
}
export interface AuthTokenPayloadModel {
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
