import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class AppService {
  constructor(@Inject('MONGO') private database: Db) {}

  getHello(): string {
    return 'Technical test Empowerment Labs API 🧑🏽‍💻  V0.0.1';
  }
}
