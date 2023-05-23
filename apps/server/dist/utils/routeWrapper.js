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
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeWrapper = void 0;
const routeWrapper = (cb) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const handlerResponse = yield cb(req, res, next);
        if (handlerResponse) {
            return res.status(200).json({
                data: handlerResponse.data || {},
                metadata: handlerResponse.metadata
            });
        }
        return res.status(200).json();
    }
    catch (error) {
        next(error);
    }
});
exports.routeWrapper = routeWrapper;
