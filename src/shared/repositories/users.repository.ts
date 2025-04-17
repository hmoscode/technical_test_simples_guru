import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';

@Injectable()
export class UserRepository extends Repository<UsersEntity> {
  constructor(datasource: DataSource) {
    super(UsersEntity, datasource.createEntityManager());
  }
}
