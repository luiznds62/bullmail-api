import express from 'express';
import { DocsController } from './docs/DocsController';
import { UserController } from './user/UserController';

const router = express.Router();
const routes = [new UserController(router)];

router.use('/api-docs', new DocsController(router).router);
routes.forEach((route) => {
  router.use(route.getName(), route.getRouter());
});

export default router;
