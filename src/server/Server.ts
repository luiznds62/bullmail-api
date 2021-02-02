import express from "express";
import EventEmitter from "events";
import * as routes from "../api/index";
import environment from "../common/Environments";
import { logger } from "../common/Logger";

export class Server extends EventEmitter {
  application: express.Application;

  constructor() {
    super();
    this.application = express();
    this.initListeners();
  }

  initListeners() {
    this.on("listening", () => {
      logger.info(`Server is listening on port: ${environment.SERVER.PORT}`);
    });
  }

  initRoutes() {
    Object.values(routes).forEach((route) => {
      this.application.use((<any>route).basePath, (<any>route).router);
    });
  }

  start() {
    return new Promise((resolve, reject) => {
      try {
        this.application.listen(environment.SERVER.PORT);
        this.emit("listening");
        resolve(this);
      } catch (error) {
        reject(error);
      }
    });
  }
}
