"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProducts1640852297554 = void 0;
const typeorm_1 = require("typeorm");
class createProducts1640852297554 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("products", true, true, true);
    }
}
exports.createProducts1640852297554 = createProducts1640852297554;
//# sourceMappingURL=create-products.js.map