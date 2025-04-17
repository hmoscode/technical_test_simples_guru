import { Injectable } from '@nestjs/common';
import { CrudUsersService } from '../services/crudUsers.service';
import { CreateOrUpdateUserDto } from '../dtos/user.dto';
import { UsersEntity } from 'src/shared/entities/users.entity';
import { PasswordService } from 'src/shared/services/password.service';

@Injectable()
export class CrudUserUseCase {
  constructor(
    private readonly crudUserService: CrudUsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async create(data: CreateOrUpdateUserDto): Promise<number> {
    const userEntity: UsersEntity = {
      name: data.name,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
      email: data.email,
      isActive: data.isActive,
      password: await this.passwordService.generateHash(data.password),
    };

    const userId = await this.crudUserService.create(userEntity);

    return userId;
  }

  async update(data: CreateOrUpdateUserDto) {
    const userEntity: UsersEntity = {
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
      email: data.email,
      isActive: data.isActive,
      password: await this.passwordService.generateHash(data.password),
    };

    await this.crudUserService.update(userEntity);
  }

  async delete(id: number) {
    await this.crudUserService.delete(id);
  }
}
