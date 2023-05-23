import { UserCreateDto, UserFindDto } from "../dtos/user";
import { IRoutes } from "../interfaces/routes";
import UserService from "../services/user";
import { Router } from "express";
import { routeWrapper } from '../utils/routeWrapper'
import passport from "passport";
export default class UserRoutes implements IRoutes {
  public path = '/user';
  public router: Router = Router();

  private UserService = new UserService();
  constructor() {
    this.initializeRoutes()
  }
  private initializeRoutes() {
    this.router.post(
      '/generateAccount',
      routeWrapper(async (req) => {
        const userData: UserCreateDto = req.body;
        const data = await this.UserService.createUser(userData);
        return { data }
      }));

    this.router.post(
      '/login',
      routeWrapper(async (req)  => {
        const userData: UserFindDto = req.body;
        const userSignInfo = await this.UserService.findUserByUserData(userData);
        const data = this.UserService.makeJWT(userSignInfo);
        return { data }
      }));
      this.router.get(
        '/user-list',
        passport.authenticate('local', { session: false }),
        routeWrapper(async (req) => {
          const data = await this.UserService.findAllUser();
          return { data }
        }));
  }
}
