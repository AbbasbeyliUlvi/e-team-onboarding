import { QueryResult } from "pg";
import { IBaseRepository } from "../../Abstract/IBaseRepository";
import { PgClient } from "../Client";
import { FindOptions } from "../CustomRepositoryTypes";


export abstract class CustomBaseRepository<TEntity extends { [key: string]: any }, TID> implements IBaseRepository<TEntity, TID>  {

    abstract tableName: string;
    abstract primaryColumnName: string;

    async find(options?: FindOptions<TEntity>): Promise<TEntity[]> {
        const query = `select * from ${this.tableName}`;
        const result = await PgClient.executeQuery<TEntity[]>(query, [], async (res) => res.rows);
        return result;
    }

    async findOne(options?: FindOptions<TEntity>): Promise<TEntity> {
        throw new Error("Method not implemented.");
    }

    async findByPK(id: TID): Promise<TEntity> {
        const query = `select * from ${this.tableName} where ${this.primaryColumnName}=$1`;
        const result = await PgClient.executeQuery<TEntity>(query, [id], async (res) => res.rows[0]);

        return result;
    }


    async save(entity: TEntity): Promise<TEntity> {
        let result: TEntity;

        if (entity[this.primaryColumnName]) {
            const { query, values } = this.mapToUpdateQuery(entity);
            result = await PgClient.executeQuery(query, values, (res) => this.parseUpdateResult(res, entity));
        } else {
            const { query, values } = this.mapToInsertQuery(entity);
            result = await PgClient.executeQuery(query, values, (res) => this.parseInsertResult(res, entity));
        }

        return result;
    }

    protected mapToInsertQuery(entity: TEntity) {
        let { keys, values, parameterNames } = this.getKeysAndValues(entity);
        let query = `
    INSERT INTO ${this.tableName} 
(${keys.join(',')}) 
VALUES (${parameterNames.join(',')}) 
RETURNING *`;

        console.log(query, '\n', values);
        return { query, values };
    }

    protected mapToUpdateQuery(entity: TEntity) {
        let pVal: unknown;
        const pColumn = this.primaryColumnName;
        const { keys, values, parameterNames } = this.getKeysAndValues(entity);
        const pairs: string[] = [];

        keys.map((k, index) => {
            if (k === `"${pColumn}"`) {
                pVal = values[index];
            }

            pairs.push(`${k}=${parameterNames[index]}`)
        })

        let query = `
    UPDATE ${this.tableName} 
SET ${pairs.join(', ')} 
WHERE "${pColumn}"=$${parameterNames.length + 1}
RETURNING *
        `;
        values.push(pVal);

        console.log(query, '\n', values);
        return { query, values };
    }

    protected getKeysAndValues(entity: TEntity) {
        let keys: string[] = [];
        let values: any[] = [];
        let parameterNames: string[] = [];

        Object
            .entries(entity)
            .map(([key, val]) => {
                if (typeof val !== 'object' && typeof val !== 'undefined' && typeof val !== 'function') {
                    keys.push(`"${key}"`);
                    values.push(val);
                    parameterNames.push(`$${parameterNames.length + 1}`);
                }
                else if (val && val.id) {
                    keys.push(`"${key}_id"`);
                    values.push(val.id);
                    parameterNames.push(`$${parameterNames.length + 1}`);
                }
            });

        return { keys, values, parameterNames };
    }

    private async parseUpdateResult(result: QueryResult<any>, entity: TEntity) {
        return Object.assign(entity, result.rows[0]);
    }

    private async parseInsertResult(result: QueryResult<any>, entity: TEntity) {
        return Object.assign(entity, result.rows[0]);
    }
}