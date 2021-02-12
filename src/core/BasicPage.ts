export class BasicPage<T> {
    private Content: T[];
    private Total: number;
    private HasNext: boolean

    constructor() {
    }

    content(content: T[]): BasicPage<T> {
        this.Content = content;
        return this;
    }

    total(total: number): BasicPage<T> {
        this.Total = total;
        return this;
    }

    hasNext(hasNext: boolean): BasicPage<T> {
        this.HasNext = hasNext
        return this;
    }

    build(): BasicPage<T> {
        return this;
    }
}