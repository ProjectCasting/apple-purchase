# Apple Purchase

## Installation
```bash
$ cd my-project
$ npm install git+ssh://git@github.com:codevon/apple-purchase.git#v1.0.0 --save
```

## Migration

### Copy migration files
- for sequelize
```bash
$ npx ap migration -d <The path of the migration file> -t sequelize
```

- for typeorm
```bash
$ npx ap migration -d <The path of the migration file> -t typeorm
```

### Run migraion
- for sequelize
```bash
$ npx sequelize db:migrate
```

- for typeorm
```bash
$ npx ts-node ./node_modules/typeorm/cli.js migration:run
```


## Seed
We need to initialize the product data, for example:

```sql
INSERT INTO products (id, name, pricing, type, created_at, updated_at, deleted_at)
VALUES ('autorenew', 'autorenew', 99, 'Auto-Renewable', '2021-12-31 15:05:10.507', '2021-12-31 15:05:10.507', null);
```

### Usage

#### Handling the receipt sent by the front end
``` js
const { ApplePurchase } = require('apple-purchase')

const applePurchase = new ApplePurchase({
  env: 'Sandbox',          // Optional value: 'Live', 'Sandbox'
  shareSecret: '',         // Share secret from appstoreconnect
  connectionOptions: {     // Refer to https://typeorm.io/#/connection-options/
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: ''
  }
})

const userId = 123
const body = request.body
const result = await applePurchase.handleReceipt(userId, body.receipt);

console.log(result)
```
##### Response example
```json
{
    "status": 0,
    "message": "This receipt is valid.",
    "data": {
        "id": "a36dacad-9c50-440c-85c0-cd6d048181d1",
        "userId": "123",
        "startDate": "2022-01-10T09:15:54.000Z",
        "expiresDate": "2022-01-10T09:21:54.000Z",
        "isTrial": false,
        "createdAt": "2022-01-10T09:17:05.729Z",
        "updatedAt": "2022-01-10T09:29:08.000Z"
    }
}
```


#### Handling App Store Server Notifications
```js
const { ApplePurchase } = require('apple-purchase')

const applePurchase = new ApplePurchase({
  env: 'Sandbox',          // Optional value: 'Live', 'Sandbox'
  shareSecret: '',         // Share secret from appstoreconnect
  connectionOptions: {     // Refer to https://typeorm.io/#/connection-options/
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: ''
  }
})
const body = request.body
const result = await applePurchase.handleWebhook(body.signedPayload);
console.log(result)
```

##### Response example
```json
{
    "status": 200,
    "data": {
        "id": "a36dacad-9c50-440c-85c0-cd6d048181d1",
        "userId": "123",
        "startDate": "2022-01-10T09:15:54.000Z",
        "expiresDate": "2022-01-10T09:21:54.000Z",
        "isTrial": false,
        "autoRenewStatus": false,
        "createdAt": "2022-01-10T09:17:05.729Z",
        "updatedAt": "2022-01-10T09:29:08.000Z"
    }
}
```
