import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import {
  AuthTokenPayloadModel,
  AuthTokenResponseDto,
  SignInDto,
} from '../dtos/auth.dto';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { PasswordService } from 'src/shared/services/password.service';

@Injectable()
export class AuthUseCase {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepostory: UserRepository,
    private readonly passwordService: PasswordService,
  ) {}

  async signIn(data: SignInDto): Promise<AuthTokenResponseDto> {
    const user = await this.userRepostory.findOne({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const verifyPassword = await this.passwordService.compare(
      data.password,
      user.password,
    );

    if (!verifyPassword) {
      throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED);
    }

    const payload: AuthTokenPayloadModel = {
      sub: user.id,
      email: user.email,
    };

    const tokens = await this.authService.generateTokens(payload);

    return tokens;
  }
}
