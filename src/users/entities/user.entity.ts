import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Movie } from '../../movies/entities/movie.entity';
@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Movie.name }] })
  favoriteMovies: Types.Array<Movie>;
}

export const UserSchema = SchemaFactory.createForClass(User);
