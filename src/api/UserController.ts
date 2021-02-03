import Controller from "../common/Controller";
import { User } from "../domain/user/User";
import { UserService } from "../domain/user/UserService";
import * as express from "express";
class UserController extends Controller<User, UserService> {
  constructor() {
    super(User, "/users", UserService);
    this.applyRoutes();
  }

  findAll = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.json(this.service.findAll());
    next();
  };

  create = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const user = await this.service.create(req.body);
    res.json(user);
    next();
  };

  applyRoutes = () => {
    this.router.get("/", this.findAll);
    this.router.post("/", this.create);
  };
}

export default new UserController();
