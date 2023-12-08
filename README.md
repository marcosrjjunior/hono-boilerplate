## Hono Kysely Boilerplate

Hono Kysely Boilerplate

#### Structure

The main app implementation is inside of the `/app` directory where it uses basic js node implementation.

This project was structured in a way that we can change the platform to test other tools in case need it and easy migration.

The base runs on top of [Hono](https://hono.dev) which follows the Web Standard API, that is what allows us to run on different platforms.

`/routes`: it holds the routes of the application.

`/node.ts`: This is the initial file to run the project using node.

`/bun.ts`: This is the initial file to run the project using bun.

`/lib/db`: Contain the Database structure. Migrations, seed and types.

---

#### Run using Nodejs

Set the correct nodejs version, run

```
nvm use
```

Install dependencies and run the project

```
pnpm install
pnpm run node:dev
```

Dependencies

```
@hono/node-server
typescript
```

#### Run using Bun

```
bun install
bun run dev
```

## Database

Create an initial database and make sure the env variables are correctly set

```
DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_PASSWORD=secret
DATABASE_PORT=5432
DATABASE_NAME=project
```

## Migrations

Run all migrations

```
pnpm db:migrate:up
```

Rollback previous migration

```
pnpm db:migrate:down
```

Run seed

```
pnpm db:seed
```

Reset migrations + run seed

```
pnpm db:reset
```

#### How to write a migration

To make an update on the database you will need to create a migration

Run the command

```
pnpm db:migrate:create
```

This will generate a new file under `/lib/db/migrations/DATE-initial.ts`

- Rename the file to describe what the migration will do e.g `DATE-adding_phone_column_to_user.ts`

- Functions **up** and **down** should work.

## Run test

Running tests using bun

```
bun test
```

> Reference: https://bun.sh/docs/cli/test#run-tests
