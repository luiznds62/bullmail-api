export class BasicPage<T> {
  private content: T[];
  private total: number;
  private hasNext: boolean;

  constructor() {}

  getTotal(): number {
    return this.total;
  }

  getHasNext(): boolean {
    return this.hasNext;
  }

  getContent(): T[] {
    return this.content;
  }

  setContent(content: T[]): BasicPage<T> {
    this.content = content;
    return this;
  }

  setTotal(total: number): BasicPage<T> {
    this.total = total;
    return this;
  }

  setHasNext(hasNext: boolean): BasicPage<T> {
    this.hasNext = hasNext;
    return this;
  }

  build(): BasicPage<T> {
    return this;
  }
}
