interface IRepository {
  findAll();
  findById(id);
  create(model);
  merge(model);
  delete(id);
}

import Datastore from "nedb";

export class Repository<T> implements IRepository {
  db: Datastore;

  constructor(model) {
    this.db = new Datastore((model.path));
    this.db.loadDatabase();
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
      this.db.findOne({ id: _id }, (err, doc) => {
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

  merge(model): Promise<Number> {
    return new Promise((resolve, reject) => {
      this.db.update({ id: model.id }, model, {}, (err, numReplaced) => {
        if (err) reject(err);

        resolve(numReplaced);
      });
    });
  }

  delete(_id): Promise<Number> {
    return new Promise((resolve, reject) => {
      this.db.remove({ id: _id }, {}, (err, numRemoved) => {
        if (err) reject(err);

        resolve(numRemoved);
      });
    });
  }
}
