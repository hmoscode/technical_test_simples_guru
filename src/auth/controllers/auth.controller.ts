import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthUseCase } from '../useCase/auth.UseCase';
import { AuthTokenResponseDto, SignInDto } from '../dtos/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post('sign-in')
  async signIn(@Body() data: SignInDto): Promise<AuthTokenResponseDto> {
    return await this.authUseCase.signIn(data);
  }
}
