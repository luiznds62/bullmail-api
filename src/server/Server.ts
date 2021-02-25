import express from 'express';
import EventEmitter from 'events';
import environment from '../common/Environments';
import { logger } from '../common/Logger';
import { errorHandler } from '../common/ErrorHandler';
import methodOverride from 'method-override';
import * as bodyParser from 'body-parser';
import * as routes from '../api/router';

export default class Server extends EventEmitter {
  application: express.Application;

  constructor() {
    super();
    this.application = express();
    this.initRoutes();
    this.initListeners();
  }

  initListeners() {
    this.on('listening', () => {
      logger.info(`Server is listening on port: ${environment.SERVER.PORT}`);
    });

    this.on('closing', () => {
      logger.info(`Server is closing`);
    });
  }

  initRoutes() {
    Object.values(routes).forEach((route) => {
      this.application.use((<any>route).basePath, (<any>route).router);
    });

    this.application.use(errorHandler);
  }

  start() {
    return new Promise((resolve, reject) => {
      try {
        this.application.use(bodyParser.urlencoded({ extended: true }));
        this.application.use(bodyParser.json());
        this.application.use(methodOverride());
        this.application.listen(environment.SERVER.PORT);
        this.emit('listening');
        resolve(this);
      } catch (error) {
        reject(error);
      }
    });
  }

  shutdown() {
    this.emit('closing');
    (<any>this.application).close();
  }
}
