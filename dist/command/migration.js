"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationCommand = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const cli_color_1 = __importDefault(require("cli-color"));
const utils_1 = require("./utils");
class MigrationCommand {
    constructor() {
        this.command = 'migration';
        this.describe = 'Copy migration file for subscription.';
    }
    builder(args) {
        return args
            .option('t', {
            alias: 'type',
            type: 'string',
            choices: ['typeorm', 'sequelize'],
            default: 'typeorm',
            describe: 'The type of database orm used.'
        })
            .option('d', {
            alias: 'dir',
            demandOption: true,
            describe: 'Directory where migration should be created.'
        })
            .option('o', {
            alias: 'outputJs',
            type: 'boolean',
            default: false,
            describe: 'Generate a migration file on Javascript instead of Typescript',
        });
    }
    async handler(args) {
        try {
            let directory = args.dir;
            let type = args.type;
            const targetPath = path_1.default.resolve(process.cwd(), directory);
            const sourcePath = path_1.default.resolve(__dirname, `../../src/db/${type}/migration`);
            const files = fs_1.default.readdirSync(sourcePath);
            console.log(`Copy migration file to ${targetPath}`);
            const timestamp = new Date().getTime();
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                const time = file.slice(0, 13);
                const content = fs_1.default.readFileSync(`${sourcePath}/${file}`, 'utf-8');
                let newTime;
                if (type === 'sequelize') {
                    newTime = (0, utils_1.getSequelizeTime)(timestamp + index * 1000);
                }
                else {
                    newTime = timestamp + index;
                }
                const newFile = file.replace(time, `${newTime}`);
                console.log(cli_color_1.default.blueBright(newFile));
                const newContent = content.replace(time, `${newTime}`);
                fs_1.default.writeFileSync(`${targetPath}/${newFile}`, newContent, 'utf-8');
            }
            console.log(`Migration files has been generated successfully.`);
        }
        catch (err) {
            console.error(err);
            process.exit(1);
        }
    }
}
exports.MigrationCommand = MigrationCommand;
//# sourceMappingURL=migration.js.map