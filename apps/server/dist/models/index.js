"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.Sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const database_1 = __importDefault(require("../config/database"));
const env = 'development';
const envConfig = database_1.default[env] || 'development';
const sequelize = envConfig.url
    ? new sequelize_1.Sequelize(envConfig.url, envConfig)
    : new sequelize_1.Sequelize(envConfig.database, envConfig.username, envConfig.password, envConfig);
exports.sequelize = sequelize;
