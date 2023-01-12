import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { AddFavoriteMovieDto, CreateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: 'List of users',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized' })
  findAll() {
    return this.usersService.findAll();
  }

  @Post('favorite')
  @ApiOperation({
    summary: 'Add favorite movie',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized' })
  addFavoriteMovies(@Body() payload: AddFavoriteMovieDto) {
    return this.usersService.favoriteMovies(payload);
  }

  @Post()
  @Public()
  @ApiOperation({
    summary: 'Store user',
  })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }
}
