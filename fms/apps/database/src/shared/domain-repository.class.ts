import { Repository } from 'typeorm';
import { Page } from './page.class';
import { PagedData } from './paged-data.class';

export class DomainRepository<T, Entity> extends Repository<Entity> {
  createResource = async (resource: T) => {
    return await this.save(resource);
  };

  deleteResource = async (id: number) => {
    const item: T = {} as T;
    Object.assign(item, await this.findOne(id));
    return await this.delete(id).then(() => item);
  };

  findResource = async (id: number) => {
    const item: T = {} as T;
    Object.assign(item, await this.findOne(id));
    return item;
  };

  getPaged = async (page: Page) => {
    return await this.find({
      skip: page.currentPage * page.size,
      take: page.size,
    }).then(entities => {
      const items: T[] = [];
      entities.forEach(entity => {
        const item: T = {} as T;
        Object.assign(item, entity);
        items.push(item);
      });
      return new PagedData({
        items,
        page,
      });
    });
  };

  getAll = async () => {
    const items: T[] = [];
    const res = await this.find();
    res.forEach(entity => {
      const item: T = {} as T;
      Object.assign(item, entity);
      items.push(item);
    });
    return items;
  };

  updateResource = async (id: number, resource: T) => {
    return await this.update(id, resource).then(res => resource);
  };
}
