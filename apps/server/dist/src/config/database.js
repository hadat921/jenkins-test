"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = void 0;
require("dotenv/config");
exports.development = {
    "username": "hadat921",
    "password": 'hadat921',
    "database": "test",
    "host": "localhost",
    "dialect": "postgres",
};
exports.default = {
    development: exports.development
};
