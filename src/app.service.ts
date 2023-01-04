import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private database: Db) {}

  getHello(): string {
    return 'Hello World!';
  }
  getMovies() {
    const movieColletion = this.database.collection('movies');
    return movieColletion.find().toArray();
    // return movies;
  }
}
