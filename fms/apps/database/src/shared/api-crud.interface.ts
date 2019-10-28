import { Observable } from 'rxjs';
import { PagedData } from './paged-data.class';
import { Page } from './page.class';

export interface IApiCrud<T> {
  get(page: Page): Observable<PagedData<T>>;

  getAll(): Observable<T[]>

  find(id: number): Observable<T>;

  delete(id: number): Observable<T>;

  create(resource: T): Observable<T>;

  update(payload: { id: number, resource: T }): Observable<T>;
}