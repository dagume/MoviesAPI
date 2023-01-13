import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    apikey: process.env.API_KEY,
    urlApi: process.env.URL_API,
    jwt_secret: process.env.JWT_SECRET,

    mongo: {
      username: process.env.MONGO_INITDB_ROOT_USERNAME,
      password: process.env.MONGO_INITDB_ROOT_PASSWORD,
      db: process.env.MONGO_DB,
      host: process.env.MONGO_HOST,
      driver: process.env.MONGO_CONNECTION,
    },
  };
});
