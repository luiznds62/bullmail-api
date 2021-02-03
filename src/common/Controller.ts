import express, {
  Router,
  Request,
  Response,
  NextFunction,
  response,
} from "express";
import { ReflectiveInjector } from "injection-js";

class Controller<T, K> {
  basePath: string;
  router: express.Router;
  model: T;
  injector;
  service: K;

  constructor(model, path, service) {
    this.router = express.Router();
    this.basePath = path;
    this.model = new model();
    this.injector = ReflectiveInjector.resolveAndCreate([service]);
    this.service = this.injector.get(service);
  }

  findAll = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const models = (<any>this).model.findAll();
    res.json(models);
    next();
  };

}

export default Controller;
