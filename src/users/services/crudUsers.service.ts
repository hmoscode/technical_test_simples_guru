import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersEntity } from 'src/shared/entities/users.entity';
import { UserRepository } from 'src/shared/repositories/users.repository';
import { Not } from 'typeorm';

@Injectable()
export class CrudUsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(data: UsersEntity): Promise<number> {
    const verifyEmail = await this.userRepository.findOne({
      where: {
        email: data.email,
      },
    });

    if (verifyEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userRepository.save(data);

    return user.id;
  }

  async update(data: UsersEntity) {
    const existingUser = await this.userRepository.findOne({
      where: { id: data.id },
    });

    if (!existingUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const verifyEmail = await this.userRepository.findOne({
      where: {
        email: data.email,
        id: Not(data.id),
      },
    });

    if (verifyEmail) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    await this.userRepository.update(data.id, data);
  }

  async delete(id: number) {
    await this.userRepository.softDelete(id);
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      select: ['id', 'name', 'lastName', 'isActive', 'avatarUrl'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
