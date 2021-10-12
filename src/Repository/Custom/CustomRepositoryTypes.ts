

export declare type EntityFieldsNames<Entity = any> = {
    [P in keyof Entity]: Entity[P] extends Function ? never : P;
}[keyof Entity];

export declare type FindConditions<T> = {
    [P in keyof T]?: FindConditions<T[P]>;
};

export interface FindOptions<TEntity> {

    select?: (keyof TEntity)[];

    where?: FindConditions<TEntity>[] | FindConditions<TEntity>;

    relations?: string[];

    order?: {
        [P in EntityFieldsNames<TEntity>]?: "ASC" | "DESC" | 1 | -1;
    };
}