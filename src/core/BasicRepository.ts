import Datastore from 'nedb';
import { logger } from "../common/Logger";
import { BasicEntity } from "./BasicEntity";
import { EventEmitter } from "events";
import { BasicPage } from "./BasicPage";

interface IRepository<T> {
    findAll(offset: number, limit: number, sort: string): Promise<BasicPage<T>>;

    findById(id);

    find(query): Promise<T[]>;

    findOne(query): Promise<T>;

    create(model: T);

    merge(id, model: T);

    delete(id);
}

export abstract class BasicRepository<T extends BasicEntity> extends EventEmitter implements IRepository<T> {
    private db: Datastore;
    model;

    constructor(model) {
        super();
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

        this.on("create", e => {
            e.model.beforePersist();
        });

        this.on("merge", e => {
            e.model.beforePersist();
        });
    }

    async findAll(offset: number, limit: number, sort: string): Promise<BasicPage<T>> {
        return new Promise((resolve, reject) => {
            const skip = offset * limit;
            this.db.find({})
                .skip(skip)
                .limit(limit)
                .sort(sort)
                .exec((err, docs) => {
                    if (err) reject(err);

                    this.db.count({}).exec((err, count) => {
                        const page = new BasicPage<T>()
                            .setContent(docs.map(doc => new this.model(doc)))
                            .setTotal(Number(count))
                            .setHasNext((skip + docs.length) < Number(count))
                            .build();

                        resolve(page);
                    });
                });
        });
    }

    findOne(query): Promise<T> {
        return new Promise((resolve, reject) => {
            this.db.findOne(query, (err, doc) => {
                if (err) reject(err);

                resolve(doc ? new this.model(doc) : undefined);
            });
        });
    }

    find(query): Promise<T[]> {
        return new Promise((resolve, reject) => {
            this.db.find(query, (err, docs) => {
                if (err) reject(err);

                resolve(docs ? docs.map(doc => new this.model(doc)) : undefined);
            });
        });
    }

    findById(_id): Promise<T> {
        return new Promise((resolve, reject) => {
            this.db.findOne({ _id: _id }, (err, doc) => {
                if (err) reject(err);

                resolve(doc ? new this.model(doc) : undefined);
            });
        });
    }

    create(model): Promise<T> {
        return new Promise((resolve, reject) => {
            this.emit("create", { model });
            this.db.insert(model, (err, newDoc) => {
                if (err) reject(err);

                resolve(new this.model(newDoc));
            });
        });
    }

    merge(_id, model): Promise<T> {
        return new Promise((resolve, reject) => {
            this.emit("merge", { _id, model });
            delete model["_id"];
            this.db.update({ _id: _id }, model, {}, (err, numReplaced) => {
                if (err) reject(err);
                resolve(this.findById(_id));
            });
        });
    }

    delete(_id): Promise<Number> {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: _id }, {}, (err, numRemoved) => {
                if (err) reject(err);

                resolve(numRemoved);
            });
        });
    }
}
