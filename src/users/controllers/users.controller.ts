import {
  Body,
  Controller,
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
  UpdatedResponseDto,
} from 'src/shared/dtos/response.dto';
import { CreateOrUpdateUserDto, UsersMeResponseDto } from '../dtos/user.dto';
import {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
} from 'src/shared/constants/message.constants';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly crudUserUseCase: CrudUserUseCase) {}

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

  @Get('/me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  @ApiOkResponse({ type: UsersMeResponseDto })
  async getInitData(@Request() req) {
    return await this.crudUserUseCase.findById(req.user.sub);
  }
}
