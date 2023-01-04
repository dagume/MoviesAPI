import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env', // Configuracion por ambientes
      load: [config], // Configuracion de tipado
      isGlobal: true, //Modulo de configuracion global
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
      }), //Validacion de schema
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
