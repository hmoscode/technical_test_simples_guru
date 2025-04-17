import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [SharedModule.forRoot(), UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
