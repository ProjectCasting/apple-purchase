"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSubscriptions1640853100465 = void 0;
const typeorm_1 = require("typeorm");
class createSubscriptions1640853100465 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "subscriptions",
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
                    name: "product_id",
                    type: "varchar",
                    length: "40",
                    isNullable: false,
                    comment: "related product id",
                },
                {
                    name: "start_date",
                    type: "timestamp(3)",
                    isNullable: false,
                    comment: "subscription start date",
                },
                {
                    name: "expires_date",
                    type: "timestamp(3)",
                    isNullable: true,
                    comment: "subscription expires date",
                },
                {
                    name: "is_trial_period",
                    type: "tinyint",
                    isNullable: false,
                    default: "0",
                    comment: "is trial period",
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
        await queryRunner.dropTable("subscriptions", true, true, true);
    }
}
exports.createSubscriptions1640853100465 = createSubscriptions1640853100465;
//# sourceMappingURL=1640853100465-create-subscriptions.js.map