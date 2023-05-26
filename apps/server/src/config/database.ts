import "dotenv/config";
import { IDatabaseConfig } from "../interfaces/databases";

export const development: IDatabaseConfig = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || "localhost",
  dialect: "postgres",
};

export default {
  development,
};
