import express from 'express';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('../../assets/docs/swagger_output.json');

class DocsController {
  basePath: string = '/docs';

  private router: express.Router = express.Router();

  constructor() {
    this.router.use(this.basePath, swaggerUi.serve);
    this.applyRoutes();
  }

  applyRoutes = () => {
    this.router.get('/', swaggerUi.setup(swaggerDocument));
  };
}

export default new DocsController();
