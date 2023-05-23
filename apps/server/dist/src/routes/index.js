"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = __importDefault(require("../services"));
class IndexRoute {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.indexService = new services_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, (req, res, next) => {
            try {
                res.status(200).json(this.indexService.hello());
            }
            catch (error) {
                next(error);
            }
        });
    }
}
const routes = [
    new IndexRoute(),
];
exports.default = routes;
