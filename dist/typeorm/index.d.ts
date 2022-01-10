import { Connection, ConnectionOptions } from "typeorm";
export declare const getConnection: (connectionOptions: ConnectionOptions) => Promise<Connection>;
