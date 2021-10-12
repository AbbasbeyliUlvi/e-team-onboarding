import { Client, QueryResult } from "pg";

export class PgClient {

    public static async executeQuery<TResult>(query: string, values: any[], callback: (result: QueryResult<any>) => Promise<TResult>) {

        const client = new Client(
            {
                host: 'localhost',
                user: 'postgres',
                password: 'changeme',
                database: 'mydb',
                port: 5432
            }
        );
        await client.connect();
        const queryResult = await client.query(query, values);
        const result = await callback(queryResult)
        await client.end()

        return result;
    }

}