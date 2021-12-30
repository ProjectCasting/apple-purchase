import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProducts1640852297554 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
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
            name: "name",
            type: "varchar",
            isNullable: false,
            comment: "Reference Name of product",
          },
          {
            name: "pricing",
            type: "int",
            isNullable: false,
            comment: "Reference Name of product",
          },
          {
            name: "type",
            type: "varchar",
            isNullable: false,
            comment: "product type: Consumable/Non-Consumable/Non-Renewing/Auto-Renewable",
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
    await queryRunner.dropTable("products", true, true, true);
  }

}
