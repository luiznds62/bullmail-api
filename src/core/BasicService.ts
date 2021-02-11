import {ReflectiveInjector} from "injection-js";
import {BasicRepository} from "./BasicRepository";

export class BasicService<R extends BasicRepository<any>>{
    injector;
    repository: R;

    constructor(repository) {
        this.injector = ReflectiveInjector.resolveAndCreate([repository]);
        this.repository = this.injector.get(repository);
    }

    findAll() {
        return this.repository.findAll();
    }

    findById(id) {
        return this.repository.findById(id);
    }

    create(model) {
        return this.repository.create(model);
    }

    merge(id, model) {
        return this.repository.merge(id, model);
    }

    delete(id) {
        return this.repository.delete(id);
    }
}