import { IsString, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  readonly movieIMDBId: string;

  @IsString()
  @IsNotEmpty()
  readonly languaje: string;

  @IsString()
  @IsNotEmpty()
  readonly genres: string;

  @IsString()
  @IsNotEmpty()
  readonly originalLanguage: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly overview: string;
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
