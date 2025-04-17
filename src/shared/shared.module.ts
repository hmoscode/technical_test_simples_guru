import { DynamicModule, Module } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';

@Module({})
export class SharedModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        TypeOrmModule.forFeature([UsersEntity]),
        TypeOrmModule.forRootAsync({
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'mariadb',
            host: configService.get('db.host'),
            port: configService.get<number>('db.port'),
            username: configService.get('db.user'),
            password: configService.get('db.password'),
            database: configService.get('db.database'),
            entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
          }),
        }),
      ],

      module: SharedModule,
      providers: [],
      exports: [UserRepository],
    };
  }
}
