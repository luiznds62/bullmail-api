import { BasicRepository } from './BasicRepository';
import { BasicEntity } from './BasicEntity';
import { BasicPage } from './BasicPage';
import { Inject } from 'typescript-ioc';
import { NotFoundError } from './exception/NotFoundError';

export abstract class BasicService<R extends BasicRepository<any>, T extends BasicEntity> {
  private repository: R;

  protected constructor(repository) {
    this.repository = new repository();
  }

  findAll(offset: number, limit: number, sort: string): Promise<BasicPage<T>> {
    return this.repository.findAll(offset, limit, sort);
  }

  find(query): Promise<T[]> {
    return this.repository.find(query);
  }

  async findOne(query): Promise<T> {
    const model: T = await this.repository.findOne(query);
    if (!model) {
      throw new NotFoundError('Document not found');
    }

    return model;
  }

  async findById(id): Promise<T> {
    const model: T = await this.repository.findById(id);
    if (!model) {
      throw new NotFoundError('Document not found');
    }

    return model;
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
