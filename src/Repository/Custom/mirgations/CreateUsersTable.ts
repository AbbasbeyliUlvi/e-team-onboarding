import { PgClient } from "../Client"

export class CreateUsersTable {


  public async up(): Promise<void> {
    const migrateBlogPostsTable = `
    CREATE TABLE USERS(
      "id" SERIAL,
      "email" VARCHAR NOT NULL,
      "firstName" VARCHAR NOT NULL,
      "lastName" VARCHAR 
  )`

    PgClient.executeQuery(migrateBlogPostsTable, [], async (_) => {
      console.log("TABLE USERS CREATED!")
    })
  }

  public async down(): Promise<void> {
    PgClient.executeQuery(`DROP TABLE USERS`, [], async (_) => {
      console.log("TABLE USERS DROPPED!")
    })
  }

}
