"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConnection = void 0;
const entities_1 = require("./entities");
const typeorm_1 = require("typeorm");
const defaultConfig = {
    type: 'mysql',
    port: 3306,
    host: 'localhost',
    username: '',
    password: '',
    database: '',
    synchronize: false,
    entities: entities_1.entities,
    migrations: [
        'src/migration/**/*.ts'
    ]
};
let connection;
const getConnection = async (connectionOptions) => {
    if (!connection) {
        const config = Object.assign(defaultConfig, connectionOptions);
        connection = await (0, typeorm_1.createConnection)(config);
    }
    return connection;
};
exports.getConnection = getConnection;
//# sourceMappingURL=index.js.map