"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendJsonResponse = void 0;
function sendJsonResponse(res, status, message, data) {
    res.status(status).json({
        message,
        data,
    });
}
exports.sendJsonResponse = sendJsonResponse;
