import {
  IsString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsMongoId,
  Length,
  IsEmail,
} from 'class-validator';
import { PartialType, ApiProperty, OmitType } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: 'the user name' })
  readonly name: string;

  @IsString()
  @IsEmail()
  @ApiProperty({ description: "the user' email" })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: "the user' password", deprecated: true })
  readonly password: string;

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
