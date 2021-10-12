import { PgClient } from "../Client"

export class CreateBlogPostsTable {

  public async up(): Promise<void> {
    const migrateBlogPostsTable = `
      CREATE TABLE BLOG_POSTS(
          "id" SERIAL,
          "title" VARCHAR NOT NULL,
          "content" VARCHAR NOT NULL,
          "user_id" int 
      )`

    PgClient.executeQuery(migrateBlogPostsTable, [], async (_) => {
      console.log("TABLE BLOG_POSTS CREATED!")
    })
  }

  public async down(): Promise<void> {
    PgClient.executeQuery(`DROP TABLE BLOG_POSTS`, [], async (_) => {
      console.log("TABLE BLOG_POSTS DROPPED!")
    })
  }

}
