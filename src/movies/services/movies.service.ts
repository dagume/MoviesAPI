import {
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';

import { Movie } from '../entities/movie.entity';
import {
  CreateMovieDto,
  FilterMovieDto,
  FilterMovieSearchDto,
} from '../dtos/movies.dtos';
import { catchError, firstValueFrom } from 'rxjs';
import config from '../../config';
@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  // contstructor
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
    private readonly httpService: HttpService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  // Consumir API popular movies
  async getPopularMovies(params?: FilterMovieDto) {
    if (params) {
      const { page } = params;
      const { data } = await firstValueFrom(
        this.httpService
          .get(
            `${this.configService.urlApi}/movie/popular?api_key=${this.configService.apikey}&page=${page}`,
          )
          .pipe(
            catchError((e) => {
              throw new ForbiddenException(e.message);
            }),
          ),
      );
      return data['results'];
    }
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.urlApi}/movie/popular?api_key=${this.configService.apikey}`,
        )
        .pipe(
          catchError((e) => {
            throw new ForbiddenException(e.message);
          }),
        ),
    );
    return data['results'];
  }

  // Buscar movie por titulo
  async findMovieByTitle(params?: FilterMovieSearchDto) {
    if (params) {
      const { title, language } = params;
      const { data } = await firstValueFrom(
        this.httpService
          .get(
            `${this.configService.urlApi}/search/movie?api_key=${this.configService.apikey}&language=${language}&query=${title}`,
          )
          .pipe(
            catchError((e) => {
              throw new ForbiddenException(e.message);
            }),
          ),
      );
      return data['results'];
    }
    throw new NotFoundException(`Movie not found`);
  }

  // Buscar movie por id
  async findMovieById(movie_id) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(
          `${this.configService.urlApi}/movie/${movie_id}?api_key=${this.configService.apikey}`,
        )
        .pipe(
          catchError((e) => {
            throw new ForbiddenException(e.message);
          }),
        ),
    );
    return data;
  }

  // Buscar movie por IMDBId
  async findOneByIMDBId(id: number) {
    const movie = await this.movieModel.findOne({ movieIMDBId: id }).exec();
    if (!movie) {
      return null;
    }
    return movie;
  }

  // Crear una movie
  create(data: CreateMovieDto) {
    const newMovie = new this.movieModel(data);
    return newMovie.save();
  }
}
