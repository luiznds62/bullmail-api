export abstract class Mapper<T> {
    abstract toDomain (raw: any): T;
    abstract toDTO (t: T);
}