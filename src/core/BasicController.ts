import express, {Router, Request, Response, NextFunction, response} from 'express';
import {ReflectiveInjector} from 'injection-js';
import {BasicService} from "./BasicService";
import {Mapper} from "./Mapper";

class BasicController<T, K extends BasicService<any>, M extends Mapper<any>> {
    basePath: string;
    router: express.Router;
    model: T;
    injector;
    service: K;
    mapper: M;

    constructor(model, path, service, mapper) {
        this.router = express.Router();
        this.basePath = path;
        this.model = new model();
        this.injector = ReflectiveInjector.resolveAndCreate([service,mapper]);
        this.service = this.injector.get(service);
        this.mapper = this.injector.get(mapper);
    }

    findAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            res.json(await this.service.findAll());
            next();
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const model: T = await this.service.findById(req.params.id);
            const dto: M = (<any>this.mapper).toDto(model);
            res.json(dto);
            next();
        } catch (error) {
            next(error);
        }
    };

    create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const model: T = await this.service.create(req.body);
            const dto: M = (<any>this.mapper).toDto(model);
            res.json(dto);
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
