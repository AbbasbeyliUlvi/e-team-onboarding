import { FindOptions } from "../Custom/CustomRepositoryTypes";


export interface IBaseRepository<TEntity, TID> {

    find(options?: FindOptions<TEntity>): Promise<TEntity[]>;

    findOne(options?: FindOptions<TEntity>): Promise<TEntity>;
    findByPK(id: TID): Promise<TEntity>;

    save(entity: TEntity): Promise<TEntity>;

}