export interface IWrite<T> {
  add(item: T): Promise<T>;
  update(item: T): Promise<T>;
  delete(id: number | string): Promise<void>;
}
