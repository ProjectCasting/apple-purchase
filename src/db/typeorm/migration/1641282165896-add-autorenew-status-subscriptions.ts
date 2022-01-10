import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class addAutorenewStatusSubscriptions1641282165896 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("subscriptions",new TableColumn({
            name: "auto_renew_status",
            type: "tinyint",
            isNullable: false,
            default: "0",
            comment: "auto renew status",
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("subscriptions","auto_renew_status");
    }

}
