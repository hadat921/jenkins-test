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
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const user_1 = require("../models/user");
const lodash_1 = require("lodash");
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};
passport_1.default.use('local', new passport_jwt_1.Strategy(opts, (jwt_payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataUserFromToken = jwt_payload.user;
        const user = yield user_1.User.findOne({ where: { username: dataUserFromToken.username } });
        if ((0, lodash_1.isEmpty)(user))
            return done(null, false);
        return done(null, user);
    }
    catch (error) {
        return done(error, false);
    }
})));
