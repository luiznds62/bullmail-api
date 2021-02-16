import express from 'express';
import {ReflectiveInjector} from 'injection-js';
import {BasicService} from "./BasicService";
import {Mapper} from "./Mapper";
import {HTTP_STATUS} from "../common/Constants";
import {IPaginatedRequest, paginationMiddleware} from "./middleware/PaginationMiddleware";
import {BasicEntity} from "./BasicEntity";

class BasicController<T extends BasicEntity, K extends BasicService<any, T>, M extends Mapper<T>> {
    basePath: string;
    model: T;
    service: K;
    mapper: M;
    router: express.Router;
    injector: ReflectiveInjector;

    constructor(model, path, service, mapper) {
        this.router = express.Router();
        this.basePath = path;
        this.model = new model();
        this.injector = ReflectiveInjector.resolveAndCreate([service, mapper]);
        this.service = this.injector.get(service);
        this.mapper = this.injector.get(mapper);
    }

    findAll = [paginationMiddleware, async (req: IPaginatedRequest, res: express.Response, next: express.NextFunction) => {
        try {
            let page = await this.service.findAll(req.pagination.offset, req.pagination.limit, req.pagination.sort);
            page.setContent(page.getContent().map(raw => {
                return this.mapper.toDTO(raw);
            }))
            res.json(page);
            next();
        } catch (error) {
            next(error);
        }
    }];

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
            const model: T = await this.service.merge(req.params.id, this.mapper.toDomain(req.body))
            res.json(this.mapper.toDTO(model));
            next();
        } catch (error) {
            next(error);
        }
    };

    delete = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await this.service.delete(req.params.id)
            res.sendStatus(HTTP_STATUS.SUCCESS_NO_CONTEND);
            next();
        } catch (error) {
            next(error);
        }
    };
}

export default BasicController;
