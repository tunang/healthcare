import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1765176249100 implements MigrationInterface {
    name = 'Init1765176249100'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment" ("id" varchar PRIMARY KEY NOT NULL, "patientId" integer NOT NULL, "doctorId" integer NOT NULL, "startTime" datetime NOT NULL, "endTime" datetime NOT NULL, "status" varchar CHECK( "status" IN ('PENDING','CONFIRMED','COMPLETED','CANCELLED') ) NOT NULL DEFAULT ('PENDING'), "notes" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "appointment"`);
    }

}
