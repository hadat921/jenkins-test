import { Router } from 'express';
import { IRoutes } from '../interfaces/routes'
import IndexService from '../services';
import UserRoutes from './user';

class IndexRoute implements IRoutes {
  public path = '/';
  public router = Router();
  private indexService = new IndexService()

  constructor() {
    this.initializeRoutes();
  }  
  private initializeRoutes() {
    this.router.get(`${this.path}`, (req, res, next) => {
      try {
        res.status(200).json(this.indexService.hello());
      } catch (error) {
        next(error);
      }
    });
  }
}

const routes: IRoutes[] = [
  new IndexRoute(),
  new UserRoutes(),
];

export default routes
