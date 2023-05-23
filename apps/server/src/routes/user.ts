import { UserCreateDto, UserFindDto } from "../dtos/user";
import { IRoutes } from "../interfaces/routes";
import UserService from "../services/user";
import { Router } from "express";
import { routeWrapper } from "../utils/routeWrapper";
import passport from "passport";
import { sendJsonResponse } from "../utils/responseJson";
import { UserQueryDto } from "../dtos/user";
import { plainToClass } from "class-transformer";
export default class UserRoutes implements IRoutes {
  public path = "/user";
  public router: Router = Router();

  private UserService = new UserService();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.post(
      "/generateAccount",
      routeWrapper(async (req, res, next) => {
        const userData: UserCreateDto = req.body;
        const data = await this.UserService.createUser(userData);
        return { message: "Successfully created user!", data };
      })
    );

    this.router.post(
      "/login",
      routeWrapper(async (req, res) => {
        const userData: UserFindDto = req.body;
        const userSignInfo = await this.UserService.findUserByUserData(
          userData
        );
        const token = this.UserService.makeJWT(userSignInfo);
        const data = { token: token, userSignInfo: userSignInfo };
        return { message: "Successfully logged in", data };
      })
    );
    this.router.get(
      "/user-list",
      passport.authenticate("local", { session: false }),
      routeWrapper(async (req, res) => {
        const queryParams: UserQueryDto = plainToClass(UserQueryDto, req.query);
        const data = await this.UserService.findAllUser(queryParams);
        return { message: "Get list User success!", data };
      })
    );
  }
}
