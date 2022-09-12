import { MigrationInterface, QueryRunner } from "typeorm";

export class updateForeignKey1662989886821 implements MigrationInterface {
    name = 'updateForeignKey1662989886821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_1ba3c771ceea80af631b284a47b"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_1772a9f1f75e1172c19b0390e71"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_165a973a9ecf1c3eb34a2524c48"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_68fabd60b33f830d0f0c4d2bf25"`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_1ba3c771ceea80af631b284a47b" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_1772a9f1f75e1172c19b0390e71" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_165a973a9ecf1c3eb34a2524c48" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_68fabd60b33f830d0f0c4d2bf25" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_68fabd60b33f830d0f0c4d2bf25"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "FK_165a973a9ecf1c3eb34a2524c48"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_1772a9f1f75e1172c19b0390e71"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_1ba3c771ceea80af631b284a47b"`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_68fabd60b33f830d0f0c4d2bf25" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "FK_165a973a9ecf1c3eb34a2524c48" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_1772a9f1f75e1172c19b0390e71" FOREIGN KEY ("teamId") REFERENCES "teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_1ba3c771ceea80af631b284a47b" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
