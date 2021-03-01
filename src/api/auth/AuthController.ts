import express from 'express';
import { authorize } from '../../core/middleware/AuthorizationMiddleware';
import { AuthHandler } from '../../security/AuthHandler';

class AuthController {
  basePath: string = '/auth';

  router: express.Router = express.Router();

  constructor() {
    this.applyRoutes();
  }

  applyRoutes = () => {
    this.router.post('/', new AuthHandler().authenticate);
  };
}

export default new AuthController();
