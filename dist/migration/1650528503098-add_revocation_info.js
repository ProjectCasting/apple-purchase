"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRevocationInfo1650528503098 = void 0;
const typeorm_1 = require("typeorm");
class addRevocationInfo1650528503098 {
    async up(queryRunner) {
        await queryRunner.addColumns("transactions", [
            new typeorm_1.TableColumn({
                name: "revocation_date",
                type: "timestamp(3)",
                isNullable: true,
                comment: "the revocation date when user refund the subscription",
            }),
            new typeorm_1.TableColumn({
                name: "revocation_reason",
                type: "varchat",
                length: "16",
                isNullable: true,
                comment: "the revocation reason code",
            }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns("transactions", ['revocation_date', 'revocation_reason']);
    }
}
exports.addRevocationInfo1650528503098 = addRevocationInfo1650528503098;
//# sourceMappingURL=1650528503098-add_revocation_info.js.map