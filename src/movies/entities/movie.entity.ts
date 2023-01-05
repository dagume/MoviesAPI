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
  @Prop({ required: true })
  overview: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
