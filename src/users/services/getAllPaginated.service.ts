import { Injectable } from '@nestjs/common';
import { PaginateQueryRaw } from 'src/shared/dtos/paginated.dto';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { PaginatedService } from 'src/shared/services/paginated.service';

@Injectable()
export class GetAllUsersPaginatedService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly paginatedService: PaginatedService,
  ) {}

  async getAllPaginated(params: PaginateQueryRaw) {
    const userQuery = await this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.id',
        'user.name',
        'user.lastName',
        'user.avatarUrl',
        'user.email',
        'user.isActive',
      ]);
    if (params.search) {
      userQuery.where('user.name LIKE :name', {
        name: `%${params.search}%`,
      });
    }

    const paginatedUsers = await this.paginatedService.paginateRows(
      userQuery,
      params,
    );

    return paginatedUsers;
  }
}
