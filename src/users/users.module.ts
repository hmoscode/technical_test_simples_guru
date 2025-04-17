import { Module } from '@nestjs/common';
import { CrudUsersService } from './services/crudUsers.service';

@Module({
  providers: [CrudUsersService],
})
export class UsersModule {}
