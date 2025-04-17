import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repositories/users.repository';
import { AuthTokenPayloadModel } from 'src/auth/dtos/auth.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req,
    payload: AuthTokenPayloadModel,
  ): Promise<AuthTokenPayloadModel> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new UnauthorizedException();
    }

    const user = await this.userRepository.findOne({
      where: {
        id: payload.sub,
        isActive: true,
      },
      select: ['id', 'email'],
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      sub: user.id,
      email: user.email,
    };
  }
}
