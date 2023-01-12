import {
  IsString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsMongoId,
  Length,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the user name' })
  readonly name: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ description: "the user' email" })
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6)
  @ApiProperty({ description: "the user' password" })
  readonly password: string;

  @IsEmpty()
  @ApiProperty({ description: "the user' password", deprecated: true })
  readonly favoriteMovies: string[];
}

export class AddFavoriteMovieDto {
  @IsNumber()
  @IsNotEmpty()
  readonly movie_id: number;

  @IsMongoId()
  @IsNotEmpty()
  readonly user_id: string;
}
