import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createWebhookSignedPayload1641371946776 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "webhook_signed_payload",
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
            name: "payload",
            type: "text",
            isNullable: false,
            comment: "signed payload string from apple webhook",
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
    await queryRunner.dropTable("webhook_signed_payload", true, true, true);
  }

}
