import express from "express";
import {BadRequestError} from "../exception/BadRequestError";

export interface IPaginatedRequest extends express.Request {
    pagination: {
        offset: number,
        limit: number,
        sort: string
    }
}

export const paginationMiddleware = (req: IPaginatedRequest, res: express.Response, next: express.NextFunction) => {
    let offset: number = 0;
    let limit: number = 0;
    let sort: string = "";

    try {
        if (!req.query || !(req.query.offset || req.query.limit || req.query.sort)) {
            throw new Error();
        }

        offset = parseInt(<string>req.query.offset);
        limit = parseInt(<string>req.query.limit);
        sort = <string>req.query.sort;

        req.pagination = {
            offset,
            limit,
            sort
        }

        next();
    } catch (e) {
        next(new BadRequestError("Pagination variables bad formatted"));
    }
}