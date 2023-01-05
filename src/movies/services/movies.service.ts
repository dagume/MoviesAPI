import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from '../entities/movie.entity';
import { CreateMovieDto, UpdateMovieDto } from '../dtos/movies.dtos';

@Injectable()
export class MoviesService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}
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
