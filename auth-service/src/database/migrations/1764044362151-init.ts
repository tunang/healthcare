import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1764044362151 implements MigrationInterface {
    name = 'Init1764044362151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_otp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" varchar NOT NULL, "code" varchar NOT NULL, "expiresAt" datetime NOT NULL, "used" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_otp"("id", "userId", "code", "expiresAt", "used", "createdAt") SELECT "id", "email", "code", "expiresAt", "used", "createdAt" FROM "otp"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`ALTER TABLE "temporary_otp" RENAME TO "otp"`);
        await queryRunner.query(`CREATE TABLE "temporary_otp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "code" varchar NOT NULL, "expiresAt" datetime NOT NULL, "used" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "temporary_otp"("id", "userId", "code", "expiresAt", "used", "createdAt") SELECT "id", "userId", "code", "expiresAt", "used", "createdAt" FROM "otp"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`ALTER TABLE "temporary_otp" RENAME TO "otp"`);
        await queryRunner.query(`CREATE TABLE "temporary_otp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "code" varchar NOT NULL, "expiresAt" datetime NOT NULL, "used" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_db724db1bc3d94ad5ba38518433" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_otp"("id", "userId", "code", "expiresAt", "used", "createdAt") SELECT "id", "userId", "code", "expiresAt", "used", "createdAt" FROM "otp"`);
        await queryRunner.query(`DROP TABLE "otp"`);
        await queryRunner.query(`ALTER TABLE "temporary_otp" RENAME TO "otp"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" RENAME TO "temporary_otp"`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer NOT NULL, "code" varchar NOT NULL, "expiresAt" datetime NOT NULL, "used" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "otp"("id", "userId", "code", "expiresAt", "used", "createdAt") SELECT "id", "userId", "code", "expiresAt", "used", "createdAt" FROM "temporary_otp"`);
        await queryRunner.query(`DROP TABLE "temporary_otp"`);
        await queryRunner.query(`ALTER TABLE "otp" RENAME TO "temporary_otp"`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" varchar NOT NULL, "code" varchar NOT NULL, "expiresAt" datetime NOT NULL, "used" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "otp"("id", "userId", "code", "expiresAt", "used", "createdAt") SELECT "id", "userId", "code", "expiresAt", "used", "createdAt" FROM "temporary_otp"`);
        await queryRunner.query(`DROP TABLE "temporary_otp"`);
        await queryRunner.query(`ALTER TABLE "otp" RENAME TO "temporary_otp"`);
        await queryRunner.query(`CREATE TABLE "otp" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "code" varchar NOT NULL, "expiresAt" datetime NOT NULL, "used" boolean NOT NULL DEFAULT (0), "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "otp"("id", "email", "code", "expiresAt", "used", "createdAt") SELECT "id", "userId", "code", "expiresAt", "used", "createdAt" FROM "temporary_otp"`);
        await queryRunner.query(`DROP TABLE "temporary_otp"`);
    }

}
