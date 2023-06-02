import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Router } from "express";
import { IRoutes } from "./interfaces/routes";
import cors from "cors";
import passport from "passport";
import "./middlewares/auth";
import errorMiddleware from "./utils/error";
dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get("/test", (req: Request, res: Response) => {
  res.send("Done!!!!!!!!!");
});
app.use(Router);
class App {
  public app: express.Application;
  public port: string | number;
  public env: string;

  constructor(routes: IRoutes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.env = process.env.NODE_ENV || "development";

    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  public listen() {
    return this.app.listen(this.port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
      console.log(`⚡️[server]: DB connect successfully ${this.env}`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
  }
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach((route) => {
      this.app.use(route.path, route.router);
    });
  }
}

export default App;
