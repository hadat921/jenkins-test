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
// import BalanceService from "@/services/balance";
const user_1 = __importDefault(require("../services/user"));
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const routeWrapper_1 = require("../utils/routeWrapper");
class UserRoutes {
    //   private BalanceService = new BalanceService();
    constructor() {
        this.path = '/user';
        this.router = (0, express_1.Router)();
        this.UserService = new user_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post('/generateAccount', passport_1.default.authenticate('local', { session: false }), (0, routeWrapper_1.routeWrapper)((req) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const data = yield this.UserService.createUser(userData);
            return { data };
        })));
        this.router.post('/login', (0, routeWrapper_1.routeWrapper)((req) => __awaiter(this, void 0, void 0, function* () {
            const userData = req.body;
            const userSignInfo = yield this.UserService.findUserbyUserData(userData);
            const data = this.UserService.makeJWT(userSignInfo);
            return { data };
        })));
    }
}
exports.default = UserRoutes;
