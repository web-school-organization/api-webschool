import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1663090744916 implements MigrationInterface {
    name = 'createTables1663090744916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedbacks" DROP CONSTRAINT "UQ_e94c9bd8d99a2fbaa7c1fd332d1"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "feedbacks" ADD CONSTRAINT "UQ_e94c9bd8d99a2fbaa7c1fd332d1" UNIQUE ("feedback")`);
    }

}
