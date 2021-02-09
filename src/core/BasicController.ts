import express from 'express';
import {ReflectiveInjector} from 'injection-js';
import {BasicService} from "./BasicService";
import {Mapper} from "./Mapper";

class BasicController<T, K extends BasicService<any>, M extends Mapper<T>> {
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
        this.injector = ReflectiveInjector.resolveAndCreate([service, mapper]);
        this.service = this.injector.get(service);
        this.mapper = this.injector.get(mapper);
    }

    findAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const results = (await this.service.findAll()).map(raw => {
                return this.mapper.toDTO(raw);
            });
            res.json(results);
            next();
        } catch (error) {
            next(error);
        }
    };

    findById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const model: T = await this.service.findById(req.params.id);
            res.json(this.mapper.toDTO(model));
            next();
        } catch (error) {
            next(error);
        }
    };

    create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const representation = await this.mapper.toDomain(req.body);
            const model: T = await this.service.create(representation);
            res.json(this.mapper.toDTO(model));
            next();
        } catch (error) {
            next(error);
        }
    };

    merge = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const model: T = await this.service.merge(req.params.id, this.mapper.toPersistence(req.body))
            res.json(this.mapper.toDTO(model));
            next();
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await this.service.delete(req.params.id)
            res.send(204);
            next();
        } catch (error) {
            next(error);
        }
    };
}

export default BasicController;
