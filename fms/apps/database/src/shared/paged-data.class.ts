import { Page } from './page.class';

export class PagedData<T> {
  items = [];
  page = new Page();

  constructor(data?: Partial<PagedData<T>>) {
    Object.assign(this, data);
  }
}