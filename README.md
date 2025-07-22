## Prerequsites
- Node v20+

## Installation

- Run `npm install`
- Run `npm run migrate` to create all tables in the database
- Run `npm run seed` to populate the database with required information

## Available Scripts

#### `npm start`

Runs the app in development mode. This will start a server on [http://localhost:4000](http://localhost:4000).

#### `npm test`

Runs all the tests.

#### `npm run test -t [filename].test.ts`

Runs a single test file

#### `npm run test:coverage`

Runs all the tests and generates a coverage report.

#### `npm run migrate`

Runs all migrations to create tables in the database.

#### `npm run migrate:rollback`

Rolls back the last migration.

#### `npm run migrate:rollback:all`

Rolls back all migrations.

#### `npm run seed`

Runs all seeds to populate the database with information.

#### `sequelize db:seed --seed [seed-name]` 

Runs a specific seed

#### `sequelize db:seed:undo --seed [seed-name]` 

Rolls back a specific seed

#### `sequelize migration:generate --name [migration-name]`

Generates a new migration file

#### `sequelize seed:generate --name [seed-name]`

Generates a new seed file
