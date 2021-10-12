import { FindOptions } from "../Custom/CustomRepositoryTypes";


export interface IBaseRepository<TEntity, TID> {

    find(options: FindOptions<TEntity>): Promise<TEntity[]>;

    findOne(id: TID, options: FindOptions<TEntity>): Promise<TEntity>;

    save(entity: TEntity): Promise<TEntity>;

}