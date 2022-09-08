import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateColumnEntities1662648202455 implements MigrationInterface {
    name = 'UpdateColumnEntities1662648202455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "addresses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "state" character varying(2) NOT NULL, "city" character varying(50) NOT NULL, "district" character varying(256) NOT NULL, "number" character varying(128) NOT NULL, "zipCode" character varying(8) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teachers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(150) NOT NULL, "type" character varying NOT NULL DEFAULT 'teacher', "shift" character varying(25) NOT NULL, "matter" character varying(50) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_7568c49a630907119e4a665c605" UNIQUE ("email"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "feedbacks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "feedback" character varying(200) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "teacherId" uuid, "studentId" uuid, CONSTRAINT "UQ_e94c9bd8d99a2fbaa7c1fd332d1" UNIQUE ("feedback"), CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "students" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(150) NOT NULL, "type" character varying NOT NULL DEFAULT 'student', "registration" character varying(50) NOT NULL, "shift" character varying(25) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "teamId" uuid, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "UQ_13e880a37642d39be55a6bb49ff" UNIQUE ("registration"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "schoolId" uuid, CONSTRAINT "PK_7e5523774a38b08a6236d322403" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schools" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(200) NOT NULL, "password" character varying(150) NOT NULL, "type" character varying NOT NULL DEFAULT 'school', "director" character varying(56) NOT NULL, "addressId" uuid, CONSTRAINT "UQ_74a5374cf6d1c970dd47f888bf6" UNIQUE ("email"), CONSTRAINT "REL_55332608bccd7ac09cdab11855" UNIQUE ("addressId"), CONSTRAINT "PK_95b932e47ac129dd8e23a0db548" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "teams_teachers_teachers" ("teamsId" uuid NOT NULL, "teachersId" uuid NOT NULL, CONSTRAINT "PK_fcedd9786f24a6eba472c9cceab" PRIMARY KEY ("teamsId", "teachersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0afc0cc7552d00a1c11871f93c" ON "teams_teachers_teachers" ("teamsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_ff2cd597829bdb2868095f61b5" ON "teams_teachers_teachers" ("teachersId") `);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_165a973a9ecf1c3eb34a2524c48" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_68fabd60b33f830d0f0c4d2bf25" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_1772a9f1f75e1172c19b0390e71" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_1ba3c771ceea80af631b284a47b" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schools" ADD CONSTRAINT "FK_55332608bccd7ac09cdab118556" FOREIGN KEY ("addressId") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams_teachers_teachers" ADD CONSTRAINT "FK_0afc0cc7552d00a1c11871f93c1" FOREIGN KEY ("teamsId") REFERENCES "teams"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teams_teachers_teachers" ADD CONSTRAINT "FK_ff2cd597829bdb2868095f61b51" FOREIGN KEY ("teachersId") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams_teachers_teachers" DROP CONSTRAINT "FK_ff2cd597829bdb2868095f61b51"`);
        await queryRunner.query(`ALTER TABLE "teams_teachers_teachers" DROP CONSTRAINT "FK_0afc0cc7552d00a1c11871f93c1"`);
        await queryRunner.query(`ALTER TABLE "schools" DROP CONSTRAINT "FK_55332608bccd7ac09cdab118556"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_1ba3c771ceea80af631b284a47b"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_1772a9f1f75e1172c19b0390e71"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_68fabd60b33f830d0f0c4d2bf25"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_165a973a9ecf1c3eb34a2524c48"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ff2cd597829bdb2868095f61b5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0afc0cc7552d00a1c11871f93c"`);
        await queryRunner.query(`DROP TABLE "teams_teachers_teachers"`);
        await queryRunner.query(`DROP TABLE "schools"`);
        await queryRunner.query(`DROP TABLE "teams"`);
        await queryRunner.query(`DROP TABLE "students"`);
        await queryRunner.query(`DROP TABLE "feedbacks"`);
        await queryRunner.query(`DROP TABLE "teachers"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
    }

}
