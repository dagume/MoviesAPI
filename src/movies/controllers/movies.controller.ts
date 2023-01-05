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
} from '@nestjs/common';
import { CreateMovieDto, UpdateMovieDto } from '../dtos/movies.dtos';
import { MoviesService } from '../services/movies.service';
import { MongoIdPipe } from '../../common/mongo-id/mongo-id.pipe';

@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  // listar todo
  @Get()
  findAll() {
    // ******* Listar peliculas consumiendo API
    return this.moviesService.findAll();
  }

  // Listar por id
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.moviesService.findOne(id);
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
