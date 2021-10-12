import { Connection, createConnection } from "typeorm";


export class ConnectionHelper {
    private static connection: Connection;

    static async getConnection() {
        if (!this.connection || !this.connection.isConnected) {
            this.connection = await createConnection();
        }

        return this.connection;
    }
}