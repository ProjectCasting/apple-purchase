"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiffFiles = exports.getSequelizeTime = void 0;
const fs_1 = __importDefault(require("fs"));
const format = (i) => {
    return i < 10 ? '0' + i : i;
};
const getSequelizeTime = (type, timestamp, index) => {
    if (type === 'sequelize') {
        const date = new Date(timestamp + index * 1000);
        return [
            date.getUTCFullYear(),
            format(date.getUTCMonth() + 1),
            format(date.getUTCDate()),
            format(date.getUTCHours()),
            format(date.getUTCMinutes()),
            format(date.getUTCSeconds())
        ].join('');
    }
    else {
        return timestamp + index;
    }
};
exports.getSequelizeTime = getSequelizeTime;
const getDiffFiles = (targetPath, sourcePath) => {
    const targetFiles = fs_1.default.readdirSync(targetPath);
    const sourceFiles = fs_1.default.readdirSync(sourcePath);
    const sources = sourceFiles.map(file => file.replace(/\d+/, ''));
    const targets = targetFiles.map(file => file.replace(/\d+/, ''));
    const allFiles = sources.concat(targets);
    const diff = allFiles.filter(file => !(targets.includes(file)));
    return sourceFiles.filter(file => diff.includes(file.replace(/\d+/, '')));
};
exports.getDiffFiles = getDiffFiles;
//# sourceMappingURL=utils.js.map