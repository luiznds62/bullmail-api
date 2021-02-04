import Datastore from 'nedb';
import {logger} from "./Logger";
import {BasicEntity} from "./BasicEntity";

export interface IRepository {
    findAll();

    findById(id);

    create(model);

    merge(id, model);

    delete(id);
}

export class BasicRepository<T extends BasicEntity> implements IRepository {
    db: Datastore;

    constructor(model) {
        this.db = new Datastore(model.path);
        this.db.loadDatabase(err => {
            if (err) {
                logger.error(`Local DB file could not be loaded, caused by: ${err}`);
                throw err;
            } else {
                logger.debug("Users DB - Initialized");
            }
        });
    }

    findAll(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.db.find({}, (err, docs) => {
                if (err) reject(err);

                resolve(docs);
            });
        });
    }

    findById(_id): Promise<T> {
        return new Promise((resolve, reject) => {
            this.db.findOne({id: _id}, (err, doc) => {
                if (err) reject(err);

                resolve(doc);
            });
        });
    }

    create(model): Promise<T> {
        return new Promise((resolve, reject) => {
            this.db.insert(model, (err, newDoc) => {
                if (err) reject(err);

                resolve(newDoc);
            });
        });
    }

    merge(_id, model): Promise<Number> {
        return new Promise((resolve, reject) => {
            this.db.update({id: _id}, model, {}, (err, numReplaced) => {
                if (err) reject(err);

                resolve(numReplaced);
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
