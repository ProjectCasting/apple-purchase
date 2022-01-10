#!/usr/bin/env node
import yargs from 'yargs'
import { MigrationCommand } from './command/migration'

yargs
  .usage("Usage: $0 <command> [options]")
  .command(new MigrationCommand())
  .demandCommand(1)
    .strict()
    .argv;
