import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthUseCase } from '../useCase/auth.UseCase';
import { AuthTokenResponseDto, SignInDto } from '../dtos/auth.dto';
import { seconds, Throttle } from '@nestjs/throttler';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post('sign-in')
  @ApiOkResponse({
    type: AuthTokenResponseDto,
  })
  @Throttle({
    short: {
      limit: 5,
      ttl: seconds(60),
    },
  })
  async signIn(@Body() data: SignInDto): Promise<AuthTokenResponseDto> {
    return await this.authUseCase.signIn(data);
  }
}
