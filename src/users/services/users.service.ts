import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { MoviesService } from '../../movies/services/movies.service';
import { AddFavoriteMovieDto, CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(
    private moviesService: MoviesService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  // Usuario y sus peliculas favoritas
  findAll() {
    return this.userModel.find().populate('favoriteMovies').exec();
  }

  async favoriteMovies(user_id, data: AddFavoriteMovieDto) {
    const { movie_id } = data;
    // validar que la pelicula no este registrada en mongo
    const movieDb = await this.moviesService.findOneByIMDBId(movie_id);

    // Respuesta de movie not found
    if (!movieDb) {
      // consumir api (buscar movie por movieIMDBId)
      const movieApi = await this.moviesService.findMovieById(movie_id);
      const dataMovie = {
        movieIMDBId: movieApi['id'],
        languaje: movieApi['original_language'],
        genres: movieApi['genres'][0]['name'],
        originalLanguage: movieApi['original_language'],
        title: movieApi['title'],
        overview: movieApi['overview'],
        popularity: movieApi['popularity'],
        posterPath: movieApi['poster_path'],
        releaseDate: movieApi['release_date'],
        video: movieApi['video'],
        voteAverage: movieApi['vote_average'],
        voteCount: movieApi['vote_count'],
      };
      const newmovie = await this.moviesService.create(dataMovie);
      newmovie.save();

      return await this.addFavoriteMovie(user_id, newmovie._id);
    }

    return await this.addFavoriteMovie(user_id, movieDb._id);
  }

  // Agregar favorite movie
  async addFavoriteMovie(user_id: string, movie_id: string) {
    const user = await this.findOne(user_id);
    user.favoriteMovies.push(movie_id);
    return user.save();
  }

  // Buscar por id
  async findOne(id: string) {
    return this.userModel.findById(id);
  }

  // Crear usuario
  async create(data: CreateUserDto) {
    const newModel = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newModel.password, 10);
    newModel.password = hashPassword;
    const model = await newModel.save();
    const { password, ...rta } = model.toJSON();
    return rta;
  }

  // Buscar usuario por email
  findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
