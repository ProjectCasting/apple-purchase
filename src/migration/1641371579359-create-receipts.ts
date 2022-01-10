import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createReceipts1641371579359 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "receipts",
        columns: [
          {
            name: "id",
            type: "varchar",
            length: "40",
            isPrimary: true,
            isNullable: false,
            isUnique: true,
            comment: "primary key",
          },
          {
            name: "user_id",
            type: "varchar",
            length: "40",
            isNullable: false,
            comment: "related user id",
          },
          {
            name: "payload",
            type: "text",
            isNullable: false,
            comment: "receipt string",
          },
          {
            name: "created_at",
            type: "timestamp(3)",
            isNullable: false,
            default: "current_timestamp(3)",
            comment: "created date time",
          },
          {
            name: "updated_at",
            type: "timestamp(3)",
            isNullable: false,
            default: "current_timestamp(3)",
            comment: "last updated date time",
          },
          {
            name: "deleted_at",
            type: "timestamp(3)",
            isNullable: true,
            comment: "last deleted date time",
          },
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("receipts", true, true, true);
  }

}
