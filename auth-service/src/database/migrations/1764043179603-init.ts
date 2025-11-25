import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1764043179603 implements MigrationInterface {
    name = 'Init1764043179603'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "otp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "code" varchar NOT NULL, "expiresAt" datetime NOT NULL, "used" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "otp"`);
    }

}
