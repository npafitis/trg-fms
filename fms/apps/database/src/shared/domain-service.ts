import { Observable } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { Page } from './page.class';
import { PagedData } from './paged-data.class';
import { DomainRepository } from './domain-repository.class';

export class DomainService<T, Entity> {
  constructor(private repository: DomainRepository<T, Entity>) {
  }

  create(resource: T): Observable<T> {
    return fromPromise(this.repository.createResource(resource));
  }

  delete(id: number): Observable<T> {
    return fromPromise(this.repository.deleteResource(id));
  }

  find(id: number): Observable<T> {
    return fromPromise(this.repository.findResource(id));
  }

  get(page: Page): Observable<PagedData<T>> {
    return fromPromise(this.repository.getPaged(page));
  }

  update({ id, resource }: { id: number, resource: T }): Observable<T> {
    return fromPromise(this.repository.updateResource(id, resource));
  }

  getAll(): Observable<T[]> {
    return fromPromise(this.repository.getAll());
  }
}
