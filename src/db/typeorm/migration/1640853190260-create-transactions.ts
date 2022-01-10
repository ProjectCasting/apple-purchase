import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createTransactions1640853190260 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
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
            name: "original_transaction_id",
            type: "varchar",
            length: "40",
            isNullable: false,
            comment: "original transaction id",
          },
          {
            name: "user_id",
            type: "varchar",
            length: "40",
            isNullable: false,
            comment: "related user id",
          },
          {
            name: "product_id",
            type: "varchar",
            length: "40",
            isNullable: false,
            comment: "related product id",
          },
          {
            name: "subscription_id",
            type: "varchar",
            length: "40",
            isNullable: false,
            comment: "related subscription id",
          },
          {
            name: "purchase_date",
            type: "timestamp(3)",
            isNullable: false,
            comment: "purchase date",
          },
          {
            name: "expires_date",
            type: "timestamp(3)",
            isNullable: true,
            comment: "purchase date",
          },
          {
            name: "is_trial_period",
            type: "tinyint",
            isNullable: false,
            default: "0",
            comment: "is trial period",
          },
          {
            name: "ownership_type",
            type: "varchar",
            length: "40",
            isNullable: false,
            comment: "ownership type: FAMILY_SHARED/PURCHASED",
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
    await queryRunner.dropTable("transactions", true, true, true);
  }

}
