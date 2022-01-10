"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReceipts1641371579359 = void 0;
const typeorm_1 = require("typeorm");
class createReceipts1641371579359 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("receipts", true, true, true);
    }
}
exports.createReceipts1641371579359 = createReceipts1641371579359;
//# sourceMappingURL=1641371579359-create-receipts.js.map