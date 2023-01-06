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
  UpdateMovieDto,
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
            catchError(() => {
              throw new ForbiddenException('API not available');
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
          catchError(() => {
            throw new ForbiddenException('API not available');
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
              console.log(e);
              throw new ForbiddenException('API not available');
            }),
          ),
      );
      return data['results'];
    }
    throw new NotFoundException(`Movie not found`);
  }

  // Listar todas las movies
  findAll() {
    return this.movieModel.find().exec();
  }

  // Buscar movie por id
  async findOne(id: string) {
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new NotFoundException(`Movie with id: ${id} not found`);
    }
    return movie;
  }
  // Crear una movie
  create(data: CreateMovieDto) {
    const newMovie = new this.movieModel(data);
    return newMovie.save();
  }
  //Actualizar movie
  update(id: string, changes: UpdateMovieDto) {
    const movie = this.movieModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!movie) {
      throw new NotFoundException(`Movie with id: ${id} not found`);
    }
    return movie;
  }
  // Eliminar movie
  remove(id: string) {
    const movie = this.movieModel.findByIdAndDelete(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id: ${id} not found`);
    }
    return movie;
  }
}
