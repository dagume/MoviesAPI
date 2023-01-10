import {
  IsString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsMongoId,
} from 'class-validator';
import { PartialType, ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'the user name' })
  readonly name: string;

  @IsEmpty()
  readonly favoriteMovies: string[];
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['favoriteMovies']),
) {}

export class AddFavoriteMovieDto {
  @IsNumber()
  @IsNotEmpty()
  readonly movie_id: number;

  @IsMongoId()
  @IsNotEmpty()
  readonly user_id: string;
}
