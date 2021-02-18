import {logger} from "./Logger";
import {HTTP_STATUS} from "./Constants";
import * as express from "express";

export const errorHandler = (error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(error);
    res.status(error.status || HTTP_STATUS.INTERNAL_SERVER_ERROR);
    res.json({message: error.message});
    next();
}