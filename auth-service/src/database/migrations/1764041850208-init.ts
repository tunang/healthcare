import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1764041850208 implements MigrationInterface {
    name = 'Init1764041850208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT ('PATIENT'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "status" varchar CHECK( "status" IN ('PENDING','ACTIVE','BLOCKED','DELETED') ) NOT NULL DEFAULT ('PENDING'), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "email", "password", "role", "createdAt") SELECT "id", "email", "password", "role", "createdAt" FROM "users"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`);
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "role" varchar NOT NULL DEFAULT ('PATIENT'), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"))`);
        await queryRunner.query(`INSERT INTO "users"("id", "email", "password", "role", "createdAt") SELECT "id", "email", "password", "role", "createdAt" FROM "temporary_users"`);
        await queryRunner.query(`DROP TABLE "temporary_users"`);
    }

}
