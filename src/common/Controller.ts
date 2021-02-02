import express, { Router, Request, Response, NextFunction, response } from "express";

class Controller<T> {
  basePath: string;
  router: express.Router;
  model: T;

  constructor(model,path) {
    this.router = express.Router();
    this.basePath = path;
    this.model = new model();
    this.applyRoutes();
  }

  applyRoutes() {}

  findAll = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const models = (<any>this).model.findAll();
    res.json(models);
    next();
  }
}

export default Controller;
