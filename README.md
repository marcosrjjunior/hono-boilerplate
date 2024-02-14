## Hono Boilerplate

Boilerplate for your JS projects using [Hono](https://hono.dev).

There is a setup to run your project using Nodejs or Bun.

An initial setup with [Kysely](https://kysely.dev) to manage your Database (queries, migrations, types) is also in place.

<!--
[Project Structure](#project-structure)
[Run using Nodejs](#run-using-nodejs)
[Run using Bun](#run-using-bun)
[Database](#database)
[Run test](#run-test)
[Extra Dependencies](#extra-dependencies) -->

### Project Structure

The main app implementation is inside of the `/app` directory where it uses basic js node implementation.

`/routes`: Routes of the application.  
`/node.ts`: Initial file to run the project using node.  
`/bun.ts`: Initial file to run the project using bun.  
`/lib/db`: Database structure. Migrations, seed and types.  
`/app/cases`: Use cases of your application.  
`/app/repositories`: Repositores and interfaces that are used by use cases.

---

### 1. Requirements

- [node.js v20+](https://nodejs.org/en) or [bun](https://bun.sh)
- nvm installed to manage node versions https://github.com/nvm-sh/nvm#install--update-script
- [pnpm](https://pnpm.io) to manage dependencies(npm install -g pnpm)

#### 2. Setup

**- Setup your database**

- Make sure you have a local database running. In this project you can find a docker-compose file that spin-up a postgree db. You can run that by using `pnpm db:pg`. After the first time, you can simply open your "Docker desktop" or whatever you use to manage docker to start up the service.
- Create your database running `CREATE DATABASE project`

**- Update your environment variables**

Create a `.env` files from `.env.example` and populate the values.

```
cp .env.example .env
```

**- Install your dependencies**

If you are using nodejs

```sh
nvm use
pnpm install
```

Or if you are using bun

```sh
bun install
```

**- Run the project**

If you are using nodejs

```sh
pnpm node:dev or pnpm dev
```

Or if you are using bun

```sh
pnpm bun:dev
```

From here you should be getting a server running on `http://localhost:3333`

## How to manage your Database using migrations

Migrations are currently defined under `lib/db/migrations`. An initial migration is already there as an example, but you will have to adjust to meet your project requirements.

Run all migrations

```sh
pnpm db:migrate:up
```

> This command will perform the "up" function for all new migrations

Rollback previous migration

```sh
pnpm db:migrate:down
```

> This command will perform the "down" function from previous migration

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

##### Extra Dependencies

> To run the project using nodejs, we need some extra dependencies.
> These are already set in the project.

```sh
// dependencies
@hono/node-server

// devDependencies
typescript
ts-node-dev
```
