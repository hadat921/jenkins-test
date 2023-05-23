import 'dotenv/config';
import { IDatabaseConfig } from '../interfaces/databases'

export const development: IDatabaseConfig = {
  "username": "hadat921",
  "password": 'hadat921',
  "database": "test",
  "host": "localhost",
  "dialect": "postgres",
}


export default {
  development
}
