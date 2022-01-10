import { entities } from "./entities";
import { createConnection, Connection, ConnectionOptions } from "typeorm";

const defaultConfig: ConnectionOptions = {
  type: 'mysql',
  port: 3306,
  host: 'localhost',
  username: '',
  password: '',
  database: '',
  synchronize: false,

  entities,
  migrations: [
    'src/migration/**/*.ts'
  ]
};

let connection: Connection

export const getConnection = async (connectionOptions: ConnectionOptions) => {
  if (!connection) {
    const config = Object.assign(defaultConfig, connectionOptions)
    connection = await createConnection(config)
  }

  return connection
}
