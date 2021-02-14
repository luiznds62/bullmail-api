import {logger} from "./Logger";
import * as express from "express";
import {HTTP_STATUS} from "./Constants";

export const errorHandler = (error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(error);
    res.sendStatus(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    next();
}