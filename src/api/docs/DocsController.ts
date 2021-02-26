import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../assets/docs/swagger.json';

class DocsController {
  basePath: string = '/';

  router: express.Router = express.Router();

  constructor() {
    this.router.use(this.basePath, swaggerUi.serve);
    this.applyRoutes();
  }

  applyRoutes = () => {
    this.router.get('/api-docs', swaggerUi.setup(swaggerDocument));
  };
}

export default new DocsController();
