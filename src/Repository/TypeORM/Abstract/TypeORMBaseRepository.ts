import { Connection, createConnection, EntityTarget, FindConditions, FindManyOptions, FindOneOptions } from "typeorm";
import { IBaseRepository } from "../../Abstract/IBaseRepository";
import { FindOptions } from "../../Custom/CustomRepositoryTypes";
import { ConnectionHelper } from "../ConnectionHelper";


export abstract class TypeORMBaseRepository<TEntity, TID> implements IBaseRepository<TEntity, TID>{
    protected abstract entityTarget: EntityTarget<TEntity>;
    protected abstract primaryField: keyof TEntity

    protected getConnection() {
        return ConnectionHelper.getConnection();
    }

    protected async getRepositoryAsync() {
        const connection = await this.getConnection();
        const repository = connection.getRepository(this.entityTarget);

        return repository;
    }

    async find(options?: FindOptions<TEntity>): Promise<TEntity[]> {
        const repository = await this.getRepositoryAsync();
        const result = await repository.find(options);

        return result;
    }

    async findOne(options?: FindOptions<TEntity>): Promise<TEntity> {
        const repository = await this.getRepositoryAsync();
        const result = await repository.findOneOrFail(options);

        return result;
    }

    async findByPK(id: TID): Promise<TEntity> {
        const repository = await this.getRepositoryAsync();
        const result = await repository.findOneOrFail(id);

        return result;
    }

    async save(entity: TEntity): Promise<TEntity> {
        let result = entity;
        const repository = await this.getRepositoryAsync();

        if (entity[this.primaryField]) {
            await repository.update("", entity);
        }
        else {
            result = await repository.save(entity);
        }

        return result;
    }

}