"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWebhookSignedPayload1641371946776 = void 0;
const typeorm_1 = require("typeorm");
class createWebhookSignedPayload1641371946776 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("webhook_signed_payload", true, true, true);
    }
}
exports.createWebhookSignedPayload1641371946776 = createWebhookSignedPayload1641371946776;
//# sourceMappingURL=create-webhook-signed-payload.js.map