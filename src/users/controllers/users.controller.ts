import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AddFavoriteMovieDto, CreateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'List of users',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Post('favorite')
  addFavoriteMovies(@Body() payload: AddFavoriteMovieDto) {
    return this.usersService.favoriteMovies(payload);
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
}
