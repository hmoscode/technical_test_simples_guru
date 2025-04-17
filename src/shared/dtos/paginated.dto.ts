import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginateQueryRaw {
  @ApiProperty({
    type: String,
    required: false,
    example: '1',
  })
  @IsString()
  page?: string;
  @ApiProperty({
    type: String,
    required: false,
    example: '10',
  })
  @IsString()
  perPage?: string;

  @ApiProperty({
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  search?: string;
}
export interface Paginated<T> {
  rows: T[];
  metadata: Metadata;
}
export class Metadata {
  @ApiProperty({
    description: 'Total number of pages',
    example: 10,
  })
  totalPages: number;

  @ApiProperty({
    description: 'Total number of items',
    example: 100,
  })
  totalItems: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  itemsPerPage: number;

  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  currentPage: number;

  @ApiProperty({
    description: 'Search term used for filtering',
    example: 'example search',
  })
  searchTerm: string;

  @ApiProperty({
    description: 'Next page number',
    example: 2,
  })
  nextPage: number;
}
