import express, {Router, Request, Response, NextFunction, response} from 'express';
import {ReflectiveInjector} from 'injection-js';
import {BasicService} from "./BasicService";

class BasicController<T, K extends BasicService<any>> {
    basePath: string;
    router: express.Router;
    model: T;
    injector;
    service: K;

    constructor(model, path, service) {
        this.router = express.Router();
        this.basePath = path;
        this.model = new model();
        this.injector = ReflectiveInjector.resolveAndCreate([service]);
        this.service = this.injector.get(service);
    }

    findAll = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.json(this.service.findAll());
            next();
        } catch (error) {
            next(error);
        }
    };

    findById = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.json(this.service.findById(req.params.id));
            next();
        } catch (error) {
            next(error);
        }
    };

    create = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.json(this.service.create(req.body));
            next();
        } catch (error) {
            next(error);
        }
    };

    merge = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.json(this.service.merge(req.params.id, req.body));
            next();
        } catch (error) {
            next(error);
        }
    };

    delete = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.json(this.service.delete(req.params.id));
            next();
        } catch (error) {
            next(error);
        }
    };
}

export default BasicController;
