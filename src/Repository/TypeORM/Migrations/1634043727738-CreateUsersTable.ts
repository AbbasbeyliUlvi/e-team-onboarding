import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1634043727738 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE USERS(
          "id" SERIAL,
          "email" VARCHAR NOT NULL,
          "firstName" VARCHAR NOT NULL,
          "lastName" VARCHAR 
      )`);
      console.log('TABLE BLOG_POSTS CREATD');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE  IF EXISTS USERS`);
    }

}
