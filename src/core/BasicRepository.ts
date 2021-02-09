import Datastore from 'nedb';
import {logger} from "../common/Logger";
import {BasicEntity} from "./BasicEntity";

export interface IRepository<T> {
    findAll();

    findById(id);

    create(model: T);

    merge(id, model: T);

    delete(id);
}

export class BasicRepository<T extends BasicEntity> implements IRepository<T> {
    db: Datastore;
    model;

    constructor(model) {
        this.model = model;
        this.db = new Datastore(model.path);
        this.db.loadDatabase(err => {
            if (err) {
                logger.error(`Local DB file could not be loaded, caused by: ${err}`);
                throw err;
            } else {
                logger.debug(`${model.name} DB - Initialized`);
            }
        });
    }

    findAll(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, docs) => {
                if (err) reject(err);

                resolve(docs.map(doc => new this.model(doc)));
            });
        });
    }

    findById(_id): Promise<T> {
        return new Promise((resolve, reject) => {
            this.db.findOne({id: _id}, (err, doc) => {
                if (err) reject(err);

                resolve(new this.model(doc));
            });
        });
    }

    create(model): Promise<T> {
        return new Promise((resolve, reject) => {
            this.db.insert(model, (err, newDoc) => {
                if (err) reject(err);

                resolve(new this.model(newDoc));
            });
        });
    }

    merge(_id, model): Promise<T> {
        return new Promise((resolve, reject) => {
            this.db.update({id: _id}, model, {}, (err, numReplaced) => {
                if (err) reject(err);

                resolve(this.findById(_id));
            });
        });
    }

    delete(_id): Promise<Number> {
        return new Promise((resolve, reject) => {
            this.db.remove({id: _id}, {}, (err, numRemoved) => {
                if (err) reject(err);

                resolve(numRemoved);
            });
        });
    }
}
