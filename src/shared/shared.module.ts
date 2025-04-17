import { DynamicModule, Module } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { PasswordService } from './services/password.service';

@Module({
  providers: [PasswordService],
})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        TypeOrmModule.forFeature([UsersEntity]),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'mariadb',
            host: configService.get('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get('DB_USER'),
            password: configService.get('DB_PASS'),
            database: configService.get('DB_NAME'),
            entities: [__dirname + '/../**/*.entity.{ts,js}'],
          }),
        }),
      ],

      module: SharedModule,
      providers: [UserRepository],
      exports: [UserRepository],
    };
  }
}
