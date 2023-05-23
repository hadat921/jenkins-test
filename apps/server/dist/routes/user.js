"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../services/user"));
const express_1 = require("express");
const routeWrapper_1 = require("../utils/routeWrapper");
const passport_1 = __importDefault(require("passport"));
const user_2 = require("../dtos/user");
const class_transformer_1 = require("class-transformer");
class UserRoutes {
    constructor() {
        this.path = "/user";
        this.router = (0, express_1.Router)();
        this.UserService = new user_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post("/generateAccount", (0, routeWrapper_1.routeWrapper)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const data = yield this.UserService.createUser(userData);
            return { message: "Successfully created user!", data };
        })));
        this.router.post("/login", (0, routeWrapper_1.routeWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const userSignInfo = yield this.UserService.findUserByUserData(userData);
            const token = this.UserService.makeJWT(userSignInfo);
            const data = { token: token, userSignInfo: userSignInfo };
            return { message: "Successfully logged in", data };
        })));
        this.router.get("/user-list", passport_1.default.authenticate("local", { session: false }), (0, routeWrapper_1.routeWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const queryParams = (0, class_transformer_1.plainToClass)(user_2.UserQueryDto, req.query);
            const data = yield this.UserService.findAllUser(queryParams);
            return { message: "Get list User success!", data };
        })));
    }
}
exports.default = UserRoutes;
