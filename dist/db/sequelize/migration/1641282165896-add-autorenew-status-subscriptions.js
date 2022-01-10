"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAutorenewStatusSubscriptions1641282165896 = void 0;
const typeorm_1 = require("typeorm");
class addAutorenewStatusSubscriptions1641282165896 {
    async up(queryRunner) {
        await queryRunner.addColumn("subscriptions", new typeorm_1.TableColumn({
            name: "auto_renew_status",
            type: "tinyint",
            isNullable: false,
            default: "0",
            comment: "auto renew status",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("subscriptions", "auto_renew_status");
    }
}
exports.addAutorenewStatusSubscriptions1641282165896 = addAutorenewStatusSubscriptions1641282165896;
//# sourceMappingURL=1641282165896-add-autorenew-status-subscriptions.js.map