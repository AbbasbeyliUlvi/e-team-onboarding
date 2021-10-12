import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBlogPostsTable1634043375277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE BLOG_POSTS(
            "id" SERIAL,
            "title" VARCHAR NOT NULL,
            "content" VARCHAR NOT NULL,
            "user_id" int 
        )
        `);
        console.log('TABLE BLOG_POSTS CREATD');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE  IF EXISTS BLOG_POSTS`);
    }

}
