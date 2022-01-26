"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRequestTypeToTransactions1643167354080 = void 0;
const typeorm_1 = require("typeorm");
class addRequestTypeToTransactions1643167354080 {
    async up(queryRunner) {
        await queryRunner.addColumn("transactions", new typeorm_1.TableColumn({
            name: "request_type",
            type: "varchar",
            length: "40",
            isNullable: true,
            comment: "request type: FRONTEND/WEBHOOK",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("transactions", "request_type");
    }
}
exports.addRequestTypeToTransactions1643167354080 = addRequestTypeToTransactions1643167354080;
//# sourceMappingURL=1643167354080-add-request-type-to-transactions.js.map