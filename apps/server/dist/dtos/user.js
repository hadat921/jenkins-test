"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSignDto = exports.UserFindDto = exports.UserCreateDto = void 0;
const class_validator_1 = require("class-validator");
class UserCreateDto {
}
__decorate([
    (0, class_validator_1.IsString)()
], UserCreateDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserCreateDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserCreateDto.prototype, "walletAddress", void 0);
exports.UserCreateDto = UserCreateDto;
class UserFindDto {
}
__decorate([
    (0, class_validator_1.IsString)()
], UserFindDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsString)()
], UserFindDto.prototype, "password", void 0);
exports.UserFindDto = UserFindDto;
class UserSignDto {
}
__decorate([
    (0, class_validator_1.IsString)()
], UserSignDto.prototype, "username", void 0);
exports.UserSignDto = UserSignDto;
