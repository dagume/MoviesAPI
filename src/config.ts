import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    apikey: process.env.API_KEY,
  };
});
