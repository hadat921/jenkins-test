"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_2 = require("express");
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
require("./middlewares/auth");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/test', (req, res) => {
    res.send('Done!!!!!!!!!');
});
app.use(express_2.Router);
// app.listen(port, () => {
//   console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
// });
class App {
    constructor(routes) {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || 3000;
        this.env = process.env.NODE_ENV || 'development';
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
    }
    listen() {
        return this.app.listen(this.port, () => {
            console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
            console.log(`⚡️[server]: DB connect successfully ${this.env}`);
        });
    }
    getServer() {
        return this.app;
    }
    initializeMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(passport_1.default.initialize());
    }
    initializeRoutes(routes) {
        routes.forEach(route => {
            this.app.use(route.path, route.router);
        });
    }
}
exports.default = App;
