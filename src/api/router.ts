import express from "express";
import {DocsController} from "./docs/DocsController";
import {UserController} from "./user/UserController";

const router = express.Router();

router.use(new DocsController(router).router);
router.use(new UserController(router).router);

export default router;
