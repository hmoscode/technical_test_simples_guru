import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { AuthTokenPayModel, AuthTokenResponseDto } from '../dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateTokens(payload: AuthTokenPayModel): AuthTokenResponseDto {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      {
        sub: payload.sub,
      },
      { expiresIn: this.configService.get('JWT_REFRES_EXPIRES_IN') },
    );

    return {
      accessToken,
      refreshToken,
    };
  }
}
