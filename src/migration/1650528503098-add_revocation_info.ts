import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addRevocationInfo1650528503098 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("transactions", [
            new TableColumn({
                name: "revocation_date",
                type: "timestamp(3)",
                isNullable: true,
                comment: "the revocation date when user refund the subscription",
            }),
            new TableColumn({
                name: "revocation_reason",
                type: "varchat",
                length: "16",
                isNullable: true,
                comment: "the revocation reason code",
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("transactions", ['revocation_date', 'revocation_reason']);
    }
}
