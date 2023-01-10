import {
  IsString,
  IsNotEmpty,
  IsOptional,
  Max,
  IsPositive,
  IsNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly movieIMDBId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly languaje: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly genres: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly originalLanguage: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly overview: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly popularity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly posterPath: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly releaseDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly video: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly voteAverage: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly voteCount: number;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}

export class FilterMovieDto {
  @IsPositive()
  @IsOptional()
  @Max(500)
  @ApiProperty()
  page: number;
}
export class FilterMovieSearchDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  language: string;
}
