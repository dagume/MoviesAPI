import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { enviroments } from './enviroments';
import { DatabaseModule } from './database/database.module';
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  // Modulos
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // Configuracion por ambientes
      load: [config], // Configuracion de tipado
      isGlobal: true, //Modulo de configuracion global
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        URL_API: Joi.string().required(),
        MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
        MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_HOST: Joi.string().required(),
        MONGO_CONNECTION: Joi.string().required(),
      }), //Validacion de schema
    }),
    DatabaseModule, //Base de datos
    MoviesModule, // Peliculas
    UsersModule, //usuarios
    AuthModule,
  ],
  // controladores
  controllers: [AppController],
  // Servicios
  providers: [AppService],
})
export class AppModule {}
