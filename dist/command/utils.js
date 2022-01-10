"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequelizeTime = void 0;
const format = (i) => {
    return i < 10 ? '0' + i : i;
};
const getSequelizeTime = (timestamp) => {
    const date = new Date(timestamp);
    return [
        date.getUTCFullYear(),
        format(date.getUTCMonth() + 1),
        format(date.getUTCDate()),
        format(date.getUTCHours()),
        format(date.getUTCMinutes()),
        format(date.getUTCSeconds())
    ].join('');
};
exports.getSequelizeTime = getSequelizeTime;
//# sourceMappingURL=utils.js.map