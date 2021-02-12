import Datastore from 'nedb';
import {logger} from "../common/Logger";
import {BasicEntity} from "./BasicEntity";
import {EventEmitter} from "events";
import {BasicPage} from "./BasicPage";

export interface IRepository<T> {
    findAll(offset: number, limit: number, sort: string);

    findById(id);

    create(model: T);

    merge(id, model: T);

    delete(id);
}

export class BasicRepository<T extends BasicEntity> extends EventEmitter implements IRepository<T> {
    db: Datastore;
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
        const total = await this.db.count({});
        return new Promise((resolve, reject) => {
            this.db.find({})
                .skip(offset)
                .limit(limit)
                .sort(sort)
                .exec((err, docs) => {
                if (err) reject(err);

                const page = new BasicPage<T>()
                    .setContent(docs.map(doc => new this.model(doc)))
                    .setTotal(Number(total))
                    .setHasNext(Number(total) > offset)
                    .build();

                resolve(page);
            });
        });
    }

    findById(_id): Promise<T> {
        return new Promise((resolve, reject) => {
            this.db.findOne({_id: _id}, (err, doc) => {
                if (err) reject(err);

                resolve(new this.model(doc));
            });
        });
    }

    create(model): Promise<T> {
        return new Promise((resolve, reject) => {
            this.emit("create", {model});
            this.db.insert(model, (err, newDoc) => {
                if (err) reject(err);

                resolve(new this.model(newDoc));
            });
        });
    }

    merge(_id, model): Promise<T> {
        return new Promise((resolve, reject) => {
            this.emit("merge", {_id, model});
            this.db.update({_id: _id}, model, {}, (err, numReplaced) => {
                if (err) reject(err);
                resolve(this.findById(_id));
            });
        });
    }

    delete(_id): Promise<Number> {
        return new Promise((resolve, reject) => {
            this.db.remove({_id: _id}, {}, (err, numRemoved) => {
                if (err) reject(err);

                resolve(numRemoved);
            });
        });
    }
}
