import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { AuthTokenPayloadModel, AuthTokenResponseDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokens(payload: AuthTokenPayloadModel): AuthTokenResponseDto {
    const secret = this.configService.get<string>('JWT_SECRET');
    const accessToken = this.jwtService.sign(payload, { secret });
    const refreshToken = this.jwtService.sign(
      {
        sub: payload.sub,
      },
      {
        secret,
        expiresIn: this.configService.get('JWT_REFRES_EXPIRES_IN'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
