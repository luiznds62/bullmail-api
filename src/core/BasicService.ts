import {ReflectiveInjector} from "injection-js";
import {BasicRepository} from "./BasicRepository";
import {BasicEntity} from "./BasicEntity";
import {BasicPage} from "./BasicPage";

export class BasicService<R extends BasicRepository<any>, T extends BasicEntity> {
    private injector;
    private repository: R;

    constructor(repository) {
        this.injector = ReflectiveInjector.resolveAndCreate([repository]);
        this.repository = this.injector.get(repository);
    }

    findAll(offset: number, limit: number, sort: string): Promise<BasicPage<T>> {
        return this.repository.findAll(offset, limit, sort);
    }

    find(query): Promise<T[]> {
        return this.repository.find(query);
    }

    findOne(query) : Promise<T> {
        return this.repository.findOne(query);
    }

    findById(id): Promise<T> {
        return this.repository.findById(id);
    }

    create(model): Promise<T> {
        return this.repository.create(model);
    }

    merge(id, model): Promise<T> {
        return this.repository.merge(id, model);
    }

    delete(id): Promise<Number> {
        return this.repository.delete(id);
    }
}