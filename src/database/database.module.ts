import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { ConfigType } from '@nestjs/config';

import config from '../config';

@Global()
@Module({
  providers: [
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { driver, username, password, db, port, host } =
          configService.mongo;
        const uri = `${driver}://${username}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db(db);
        return database;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
