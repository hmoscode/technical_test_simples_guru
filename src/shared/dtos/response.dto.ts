import { ApiProperty } from '@nestjs/swagger';
import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} from '../constants/message.constants';
import { HttpStatus } from '@nestjs/common';

export interface BaseResponseDto {
  statusCode: number;
  message: string;
  error?: string;
}

export class CreatedResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Status code',
    example: HttpStatus.CREATED,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'Success message',
    example: CREATED_MESSAGE,
  })
  message: string;

  @ApiProperty({
    type: String,
    description: 'row created',
    example: '1',
  })
  rowCreated: string;
}
export class DeletedResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Status code',
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'Success message',
    example: DELETED_MESSAGE,
  })
  message: string;
}

export class UpdatedResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    description: 'Status code',
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: String,
    description: 'Success message',
    example: UPDATED_MESSAGE,
  })
  message: string;
}
