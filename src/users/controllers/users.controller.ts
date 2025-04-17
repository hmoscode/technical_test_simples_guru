import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CrudUserUseCase } from '../useCase/crudUserUseCase.useCase';
import {
  CreatedResponseDto,
  DeletedResponseDto,
  UpdatedResponseDto,
} from 'src/shared/dtos/response.dto';
import {
  ChangePasswordDto,
  CreateOrUpdateUserDto,
  UsersMeResponseDto,
} from '../dtos/user.dto';
import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} from 'src/shared/constants/message.constants';
import { AuthGuard } from '@nestjs/passport';
import { ChangePasswordUseCase } from '../useCase/changePasswordUseCase.useCase';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly crudUserUseCase: CrudUserUseCase,
    private readonly changePasswordUseCase: ChangePasswordUseCase,
  ) {}

  @Post('register')
  @ApiOkResponse({ type: CreatedResponseDto })
  async register(
    @Body() data: CreateOrUpdateUserDto,
  ): Promise<CreatedResponseDto> {
    const userId = await this.crudUserUseCase.create(data);

    return {
      statusCode: HttpStatus.CREATED,
      message: CREATED_MESSAGE,
      rowCreated: userId,
    };
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: UpdatedResponseDto })
  async update(
    @Param('id') id: number,
    @Body() data: CreateOrUpdateUserDto,
  ): Promise<UpdatedResponseDto> {
    await this.crudUserUseCase.update(id, data);

    return {
      statusCode: HttpStatus.OK,
      message: UPDATED_MESSAGE,
    };
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: DeletedResponseDto })
  async delete(@Param('id') id: number): Promise<DeletedResponseDto> {
    await this.crudUserUseCase.delete(id);

    return {
      statusCode: HttpStatus.OK,
      message: DELETED_MESSAGE,
    };
  }
  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: UsersMeResponseDto })
  async getInitData(@Request() req) {
    return await this.crudUserUseCase.findById(req.user.sub);
  }

  @Patch('/change-password')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: UpdatedResponseDto })
  async changePassword(
    @Request() req,
    @Body() data: ChangePasswordDto,
  ): Promise<UpdatedResponseDto> {
    await this.changePasswordUseCase.changePassword(req.user.sub, data);

    return {
      statusCode: HttpStatus.OK,
      message: UPDATED_MESSAGE,
    };
  }
}
