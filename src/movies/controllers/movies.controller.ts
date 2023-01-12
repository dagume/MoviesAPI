import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FilterMovieDto, FilterMovieSearchDto } from '../dtos/movies.dtos';
import { MoviesService } from '../services/movies.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Public } from '../../auth/decorators/public.decorator';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
  constructor(private moviesService: MoviesService) {}

  // Get Popular movies
  @Public()
  @Get()
  @ApiOperation({
    summary: 'List popular movies',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  ListPopularMovies(@Query() params: FilterMovieDto) {
    return this.moviesService.getPopularMovies(params);
  }

  // Buscar por titulo
  @Get('search')
  @ApiOperation({
    summary: 'List movie by title',
  })
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Query() params: FilterMovieSearchDto) {
    return this.moviesService.findMovieByTitle(params);
  }
}
