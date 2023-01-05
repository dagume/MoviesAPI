import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { MoviesService } from '../services/movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  @Get()
  findAll() {
    return this.moviesService.findAll();
  }
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }
}
