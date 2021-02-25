import express from 'express';
import { DocsController } from './docs/DocsController';
import { UserController } from './user/UserController';

const router = express.Router();

const x = new DocsController(router).router;
const y = new UserController(router).router;
router.use(x);
router.use(y);

export default router;
