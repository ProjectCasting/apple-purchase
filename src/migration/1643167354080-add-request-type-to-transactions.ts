import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class addRequestTypeToTransactions1643167354080 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn("transactions", new TableColumn({
      name: "request_type",
      type: "varchar",
      length: "40",
      isNullable: true,
      comment: "request type: FRONTEND/WEBHOOK",
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("transactions", "request_type");
  }
}
