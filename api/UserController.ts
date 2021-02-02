import express, { Router, Request, Response, NextFunction } from "express";
import Controller from "./Controller";

class UserController extends Controller {

  constructor() {
      super("/users");
  }

  applyRoutes() {
      this.router.get("/", this.findAll);
      this.router.post("/", this.create)
  }

  findAll(req: express.Request, res: express.Response, next: express.NextFunction) {
      res.json({user: "teste"})
      next();
  }

  create(req: express.Request, res: express.Response, next: express.NextFunction){
      res.json({ user: req.body})
      next();
  }
}

export default new UserController();
