import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CrudUsersService } from '../services/crudUsers.service';
import { ChangePasswordDto } from '../dtos/user.dto';
import { PasswordService } from 'src/shared/services/password.service';

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    private readonly crudUserService: CrudUsersService,
    private readonly passwordService: PasswordService,
  ) {}

  async changePassword(id: number, data: ChangePasswordDto) {
    const user = await this.crudUserService.findById(id);

    const isPasswordValid = await this.passwordService.compare(
      data.oldPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid old password', HttpStatus.BAD_REQUEST);
    }

    const hashedNewPassword = await this.passwordService.generateHash(
      data.newPassword,
    );

    user.password = hashedNewPassword;

    await this.crudUserService.update(user);
  }
}
