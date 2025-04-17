import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AuthUseCase } from './useCase/auth.UseCase';
import { AuthController } from './controllers/auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/shared/services/password.service';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { PassportModule } from '@nestjs/passport';
import { DEFAULT_STRATEGY } from 'src/shared/constants/auth.constants';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: DEFAULT_STRATEGY,
    }),
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('JWT_SECRET');

        return {
          secret,
          signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN') },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthUseCase,
    JwtService,
    PasswordService,
    UserRepository,
  ],
})
export class AuthModule {}
