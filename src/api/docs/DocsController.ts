import express from 'express';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../assets/docs/swagger_output.json');

class DocsController {
  basePath: string = '/';

  router: express.Router;

  constructor(router: express.Router) {
    this.router = router;
    this.router.use(this.basePath, swaggerUi.serve);
    this.applyRoutes();
  }

  applyRoutes = () => {
    this.router.get('/api-docs', swaggerUi.setup(swaggerDocument));
  };
}

export {DocsController}
