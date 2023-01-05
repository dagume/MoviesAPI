import { IsString, IsNotEmpty } from 'class-validator';
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
}

export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
