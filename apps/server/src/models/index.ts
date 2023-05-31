import { Sequelize } from "sequelize";
import config from "../config/database";

const env = "development";
const envConfig = config[env] || "development";
const sequelize = envConfig.url
  ? new Sequelize(envConfig.url, envConfig)
  : new Sequelize(
      envConfig.database as string,
      envConfig.username as string,
      envConfig.password,
      envConfig
    );

export { Sequelize, sequelize };
