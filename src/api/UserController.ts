import express, { Router, Request, Response, NextFunction } from "express";
import Controller from "../common/Controller";
import {User} from "../domain/User";

class UserController extends Controller<User> {

  constructor() {
      super(User,"/users");
  }

  applyRoutes() {
      this.router.get("/", this.findAll);
      this.router.post("/", this.create)
  }

  create(req: express.Request, res: express.Response, next: express.NextFunction){
      res.json({ user: req.body})
      next();
  }
}

export default new UserController();
