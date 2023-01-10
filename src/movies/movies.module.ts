import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';

import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { Movie, MovieSchema } from './entities/movie.entity';
@Module({
  imports: [
    // Importando schema
    MongooseModule.forFeature([
      {
        name: Movie.name,
        schema: MovieSchema,
      },
    ]),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  // controladores
  controllers: [MoviesController],
  // Servicios
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
