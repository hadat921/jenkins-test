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
const HttpException_1 = require("../exceptions/HttpException");
const user_1 = require("../models/user");
const lodash_1 = require("lodash");
const hash_1 = require("./hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
class UserService {
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, lodash_1.isEmpty)(userData)) {
                throw new HttpException_1.HttpException(400, "Not enough data");
            }
            const foundUserByUsername = yield user_1.User.findOne({ where: { username: userData.username } });
            if (!(0, lodash_1.isEmpty)(foundUserByUsername)) {
                throw new HttpException_1.HttpException(409, "Username has existed");
            }
            const trans = yield models_1.sequelize.transaction();
            try {
                const newUser = yield user_1.User.create({
                    username: userData.username,
                    password: userData.password,
                }, { transaction: trans });
                yield newUser.save();
                yield trans.commit();
                return newUser;
            }
            catch (error) {
                console.log("-----error", error);
                yield trans.rollback();
                throw new HttpException_1.HttpException(409, "Create user failed");
            }
        });
    }
    findUserbyUserData(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield user_1.User.findOne({ where: { username: userData.username, password: (0, hash_1.hashPassword)(userData.password) } });
            if ((0, lodash_1.isEmpty)(foundUser)) {
                throw new HttpException_1.HttpException(409, "User not exits");
            }
            const body = {
                username: foundUser === null || foundUser === void 0 ? void 0 : foundUser.getDataValue("username")
            };
            return body;
        });
    }
    makeJWT(body) {
        const jwtUser = jsonwebtoken_1.default.sign({ user: body }, process.env.SECRET_KEY);
        return jwtUser;
    }
    findAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const userList = yield user_1.User.findAll({
                attributes: [
                    "username",
                    "id",
                    "email"
                ]
            });
            return { userList };
        });
    }
}
exports.default = UserService;
