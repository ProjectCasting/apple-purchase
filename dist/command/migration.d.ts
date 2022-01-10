import * as yargs from 'yargs';
export declare class MigrationCommand implements yargs.CommandModule {
    command: string;
    describe: string;
    builder(args: yargs.Argv): yargs.Argv<{
        t: string;
    } & {
        d: unknown;
    } & {
        o: boolean;
    }>;
    handler(args: yargs.Arguments): Promise<void>;
}
