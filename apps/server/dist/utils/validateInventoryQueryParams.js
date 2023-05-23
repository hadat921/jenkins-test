"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateGameInventoryQueryParams = void 0;
const HttpException_1 = require("../exceptions/HttpException");
const lodash_1 = __importDefault(require("lodash"));
function validateGameInventoryQueryParams(queryParams) {
    if (lodash_1.default.isNaN(Number(queryParams.page)) || Number(queryParams.page) < 1) {
        throw new HttpException_1.HttpException(400, "page must be greater than or equal to 1");
    }
    if (lodash_1.default.isNaN(Number(queryParams.limit)) || Number(queryParams.limit) < 1) {
        throw new HttpException_1.HttpException(400, "limit must be greater than or equal to 1");
    }
}
exports.validateGameInventoryQueryParams = validateGameInventoryQueryParams;
