#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const migration_1 = require("./command/migration");
yargs_1.default
    .usage("Usage: $0 <command> [options]")
    .command(new migration_1.MigrationCommand())
    .demandCommand(1)
    .strict()
    .argv;
//# sourceMappingURL=cli.js.map