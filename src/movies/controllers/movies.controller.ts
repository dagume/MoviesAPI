import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateMovieDto,
  UpdateMovieDto,
  FilterMovieDto,
  FilterMovieSearchDto,
} from '../dtos/movies.dtos';
import { MoviesService } from '../services/movies.service';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  // Get Popular movies
  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  findPopularMovies(@Query() params: FilterMovieDto) {
    return this.moviesService.getPopularMovies(params);
  }

  // Buscar por titulo
  @Get('search')
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Query() params: FilterMovieSearchDto) {
    return this.moviesService.findMovieByTitle(params);
  }

  // Crear
  @Post()
  create(@Body() payload: CreateMovieDto) {
    return this.moviesService.create(payload);
  }

  // Actualizar
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateMovieDto,
  ) {
    return this.moviesService.update(id, payload);
  }

  // Eliminar
  @Delete()
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.moviesService.remove(id);
  }
}
