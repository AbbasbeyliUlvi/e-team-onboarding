import { QueryResult } from "pg";
import { IBaseRepository } from "../../Abstract/IBaseRepository";
import { PgClient } from "../Client";
import { FindOptions } from "../CustomRepositoryTypes";


export abstract class CustomBaseRepository<TEntity extends { [key: string]: any }, TID> implements IBaseRepository<TEntity, TID>  {

    abstract tableName: string;
    abstract primaryColumnName: string;

    find(options: FindOptions<TEntity>): Promise<TEntity[]> {
        throw new Error("Method not implemented.");
    }
    findOne(id: TID, options: FindOptions<TEntity>): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }

    async save(entity: TEntity): Promise<TEntity> {
        let result: TEntity;
        debugger

        if (entity[this.primaryColumnName]) {
            const { query, values } = this.mapToUpdateQuery(entity);
            result = await PgClient.executeQuery(query, values, (res) => this.getUpdateResult(res, entity));
        } else {
            const { query, values } = this.mapToInsertQuery(entity);
            result = await PgClient.executeQuery(query, values, (res) => this.getInsertResult(res, entity));
        }

        return result;
    }

    protected mapToInsertQuery(entity: TEntity) {
        let { keys, values, parameterNames } = this.getKeysAndValues(entity);
        let query = `INSERT INTO ${this.tableName} (${keys.join(',')}) VALUES (${parameterNames.join(',')}) RETURNING ${this.primaryColumnName}, ${keys.join(',')}`;

        console.log(query, values);
        return { query, values };
    }

    private async getUpdateResult(result: QueryResult<any>, entity: TEntity) {

        return Object.assign(entity, result.rows[0]);
    }

    private async getInsertResult(result: QueryResult<any>, entity: TEntity) {
        console.log(result.rows[0]);

        return Object.assign(entity, result.rows[0]);
    }

    protected mapToUpdateQuery(entity: TEntity) {
        let pVal: unknown;
        const pColumn = this.primaryColumnName;
        const { keys, values, parameterNames } = this.getKeysAndValues(entity);

        const pairs = keys.map((k, index) => {
            if (k === pColumn) {
                pVal = values[index];
                return '';
            }

            return ` ${k} = ${parameterNames[index]} `;
        })

        let query = `UPDATE ${this.tableName} SET (${pairs.join(',')}) WHERE ${pColumn}='${pVal}' RETURNING ${this.primaryColumnName}, ${keys.join(',')}`;

        console.log(query, values);
        return { query, values };
    }

    protected getKeysAndValues(entity: TEntity) {
        let keys: string[] = [];
        let values: any[] = [];
        let parameterNames: string[] = [];

        Object
            .entries(entity)
            .map(([key, val], index) => {
                if (typeof val !== 'object' && typeof val !== 'undefined' && typeof val !== 'function') {
                    keys.push(`"${key}"`);
                    values.push(val);
                    parameterNames.push(`$${index}`);
                }
                else if (val && val.id) {
                    keys.push(key + "_id");
                    values.push(val.id);
                    parameterNames.push(`$${index}`);
                }
            });

        return { keys, values, parameterNames };
    }
}