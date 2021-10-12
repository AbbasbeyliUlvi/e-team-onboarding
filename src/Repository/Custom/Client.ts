import { Client, QueryResult } from "pg";

export class PgClient {

    public static async executeQuery<TResult>(query: string, values: any[], callback: (result: QueryResult<any>) => Promise<TResult>) {

        /*PGUSER=postgres
PGHOST=localhost
PGPASSWORD=changeme
PGDATABASE=mydb
PGPORT=54321*/
        const client = new Client(
            // {
            //     user: process.env.PGUSER,
            //     host: process.env.PGHOST,
            //     database: process.env.PGDATABASE,
            //     password: process.env.PGPASSWORD,
            //     port: parseInt(process.env.PGPORT || "5432"),
            // }
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