import { Module } from '@nestjs/common';
import { CrudUsersService } from './services/crudUsers.service';
import { CrudUserUseCase } from './useCase/crudUserUseCase.useCase';
import { PasswordService } from 'src/shared/services/password.service';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { UsersController } from './controllers/users.controller';
import { PassportModule } from '@nestjs/passport';
import { DEFAULT_STRATEGY } from 'src/shared/constants/auth.constants';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: DEFAULT_STRATEGY,
    }),
  ],
  controllers: [UsersController],
  providers: [
    CrudUsersService,
    CrudUserUseCase,
    PasswordService,
    UserRepository,
  ],
})
export class UsersModule {}
