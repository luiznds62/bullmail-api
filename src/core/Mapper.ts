export abstract class Mapper<T> {
    abstract toDomain(raw: any): Promise<T>;
    abstract toDTO(t: T);
}