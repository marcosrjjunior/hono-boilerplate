## Hono Kysely Boilerplate

Structure that I've been using on my backend projects.

#### Structure

The main app implementation is inside of the `/app` directory where it uses basic js node implementation.

This project is structured on top of [Hono](https://hono.dev) which follows the Web Standard API.

`/routes`: it holds the routes of the application.

`/node.ts`: This is the initial file to run the project using node.

`/bun.ts`: This is the initial file to run the project using bun.

`/lib/db`: Contain the Database structure. Migrations, seed and types.

`/app/cases`: Contain use cases of your application.

`/app/cases`: Contain repositores and interfaces that are used by use cases.

---

#### Run using Nodejs

Set the correct nodejs version

```sh
nvm use
```

Install dependencies and run the project

```sh
pnpm install
pnpm run node:dev
```

Dependencies

```sh
@hono/node-server
typescript
```

#### Run using Bun

```sh
bun install
bun run dev
```

## Database

Create an initial database and make sure the env variables are correctly set

```sh
DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_PASSWORD=secret
DATABASE_PORT=5432
DATABASE_NAME=project
```

## Migrations

Run all migrations

```sh
pnpm db:migrate:up
```

Rollback previous migration

```sh
pnpm db:migrate:down
```

Run seed

```sh
pnpm db:seed
```

Reset migrations + run seed

```sh
pnpm db:reset
```

#### How to write a migration

To make an update on the database you will need to create a migration

Run the command

```sh
pnpm db:migrate:create
```

This will generate a new file under `/lib/db/migrations/DATE-initial.ts`

- Rename the file to describe what the migration will do e.g `DATE-adding_phone_column_to_user.ts`

- Functions **up** and **down** should work.

## Run test

Tests are implemented using bun which follows a jest-compatible structure.

```sh
pnpm test
```

> Reference: https://bun.sh/docs/cli/test#run-tests
