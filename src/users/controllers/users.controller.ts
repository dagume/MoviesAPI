import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { Request } from 'express';

import { AddFavoriteMovieDto, CreateUserDto } from '../dtos/user.dto';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';
import { PayloadToken } from 'src/auth/models/token.model';

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
  addFavoriteMovies(@Req() req: Request, @Body() payload: AddFavoriteMovieDto) {
    const user = req.user as PayloadToken;
    return this.usersService.favoriteMovies(user.sub, payload);
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
