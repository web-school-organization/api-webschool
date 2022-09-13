import { MigrationInterface, QueryRunner } from "typeorm";

export class updatedTable1663094354929 implements MigrationInterface {
    name = 'updatedTable1663094354929'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "responsibles" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "type" character varying NOT NULL DEFAULT 'responsible', "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_c3086650c39c8b98146aeb37e1f" UNIQUE ("email"), CONSTRAINT "PK_3bfd9b63cf33352711d7c82bab3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activities" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "url" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_7f4004429f731ffb9c88eb486a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "grades" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "matter" character varying NOT NULL, "grade" numeric(4,2) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_4740fb6f5df2505a48649f1687b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "informations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_3e27903b20087cf4d880bb91ac3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers_teams_teams" ("teachersId" uuid NOT NULL, "teamsId" uuid NOT NULL, CONSTRAINT "PK_e9e64542edbcaa79c47bb003b7e" PRIMARY KEY ("teachersId", "teamsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d5130f5639bdec788b4a5c7b93" ON "teachers_teams_teams" ("teachersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7fde41bc5a9592f5b759f46c34" ON "teachers_teams_teams" ("teamsId") `);
        await queryRunner.query(`CREATE TABLE "activities_student_students" ("activitiesId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_6c13b9fdc1f65e72e8a2e368632" PRIMARY KEY ("activitiesId", "studentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_af2c48f5e1aaccdf4f9f54f748" ON "activities_student_students" ("activitiesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0f2011c995e383760562216665" ON "activities_student_students" ("studentsId") `);
        await queryRunner.query(`CREATE TABLE "grades_student_students" ("gradesId" uuid NOT NULL, "studentsId" uuid NOT NULL, CONSTRAINT "PK_4ded15511649e0047f1e356065b" PRIMARY KEY ("gradesId", "studentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4f02cbf37c2c9808a3256163c6" ON "grades_student_students" ("gradesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_2397bea6200c4cab4327759f3b" ON "grades_student_students" ("studentsId") `);
        await queryRunner.query(`ALTER TABLE "students" ADD "responsiblesId" uuid`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_59c56fc1da9907309c52f839a07" FOREIGN KEY ("responsiblesId") REFERENCES "responsibles"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teachers_teams_teams" ADD CONSTRAINT "FK_d5130f5639bdec788b4a5c7b93c" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teachers_teams_teams" ADD CONSTRAINT "FK_7fde41bc5a9592f5b759f46c34d" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "activities_student_students" ADD CONSTRAINT "FK_af2c48f5e1aaccdf4f9f54f748d" FOREIGN KEY ("activitiesId") REFERENCES "activities"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "activities_student_students" ADD CONSTRAINT "FK_0f2011c995e3837605622166656" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "grades_student_students" ADD CONSTRAINT "FK_4f02cbf37c2c9808a3256163c67" FOREIGN KEY ("gradesId") REFERENCES "grades"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "grades_student_students" ADD CONSTRAINT "FK_2397bea6200c4cab4327759f3be" FOREIGN KEY ("studentsId") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "grades_student_students" DROP CONSTRAINT "FK_2397bea6200c4cab4327759f3be"`);
        await queryRunner.query(`ALTER TABLE "grades_student_students" DROP CONSTRAINT "FK_4f02cbf37c2c9808a3256163c67"`);
        await queryRunner.query(`ALTER TABLE "activities_student_students" DROP CONSTRAINT "FK_0f2011c995e3837605622166656"`);
        await queryRunner.query(`ALTER TABLE "activities_student_students" DROP CONSTRAINT "FK_af2c48f5e1aaccdf4f9f54f748d"`);
        await queryRunner.query(`ALTER TABLE "teachers_teams_teams" DROP CONSTRAINT "FK_7fde41bc5a9592f5b759f46c34d"`);
        await queryRunner.query(`ALTER TABLE "teachers_teams_teams" DROP CONSTRAINT "FK_d5130f5639bdec788b4a5c7b93c"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_59c56fc1da9907309c52f839a07"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "responsiblesId"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2397bea6200c4cab4327759f3b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4f02cbf37c2c9808a3256163c6"`);
        await queryRunner.query(`DROP TABLE "grades_student_students"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0f2011c995e383760562216665"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_af2c48f5e1aaccdf4f9f54f748"`);
        await queryRunner.query(`DROP TABLE "activities_student_students"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7fde41bc5a9592f5b759f46c34"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d5130f5639bdec788b4a5c7b93"`);
        await queryRunner.query(`DROP TABLE "teachers_teams_teams"`);
        await queryRunner.query(`DROP TABLE "informations"`);
        await queryRunner.query(`DROP TABLE "grades"`);
        await queryRunner.query(`DROP TABLE "activities"`);
        await queryRunner.query(`DROP TABLE "responsibles"`);
    }

}
