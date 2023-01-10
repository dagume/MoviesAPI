import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Movie extends Document {
  @Prop()
  id: string;
  @Prop({ required: true })
  movieIMDBId: string;
  @Prop({ required: true })
  languaje: string;
  @Prop({ required: true })
  genres: string;
  @Prop({ required: true })
  originalLanguage: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: false })
  overview: string;
  @Prop({ required: true })
  popularity: string;
  @Prop({ required: true })
  posterPath: string;
  @Prop({ required: true })
  releaseDate: string;
  @Prop({ required: true })
  video: boolean;
  @Prop({ required: true })
  voteAverage: number;
  @Prop({ required: true })
  voteCount: number;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
