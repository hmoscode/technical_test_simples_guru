import { Injectable } from '@nestjs/common';
import { CrudUsersService } from '../services/crudUsers.service';
import { CreateOrUpdateUserDto } from '../dtos/user.dto';
import { UsersEntity } from 'src/shared/entities/users.entity';
import { PasswordService } from 'src/shared/services/password.service';
import { PaginateQueryRaw } from 'src/shared/dtos/paginated.dto';
import { GetAllUsersPaginatedService } from '../services/getAllPaginated.service';

@Injectable()
export class CrudUserUseCase {
  constructor(
    private readonly crudUserService: CrudUsersService,
    private readonly passwordService: PasswordService,
    private readonly getAllUsersPaginatedService: GetAllUsersPaginatedService,
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

  async update(id: number, data: CreateOrUpdateUserDto) {
    const userEntity: UsersEntity = {
      id,
      name: data.name,
      lastName: data.lastName,
      avatarUrl: data.avatarUrl,
      email: data.email,
      isActive: data.isActive,
    };

    await this.crudUserService.update(userEntity);
  }

  async delete(id: number) {
    await this.crudUserService.delete(id);
  }

  async findById(id: number): Promise<UsersEntity> {
    const user = await this.crudUserService.findById(id);

    delete user.password;
    return user;
  }

  async getAllPaginated(params: PaginateQueryRaw) {
    return await this.getAllUsersPaginatedService.getAllPaginated(params);
  }
}
