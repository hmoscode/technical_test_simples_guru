import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateOrUpdateUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'John',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: '************',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: 'boolean',
    required: true,
    example: true,
  })
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'jhondoe@gmail.com',
  })
  @IsEmail()
  email: string;
}

export class UsersMeResponseDto {
  @ApiProperty({
    type: 'bigint',
    example: 1,
  })
  id: number;
  @ApiProperty({
    type: 'string',
    required: true,
    example: 'John',
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'Doe',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    type: 'string',
    required: true,
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    type: 'boolean',
    required: true,
    example: true,
  })
  @IsBoolean()
  isActive: boolean;
}
