# Hono Boilerplate

Boilerplate for your typescript projects using [Hono](https://hono.dev).

[Project Structure](#project-structure)  
[Tech Stack](#tech-stack)  
[Requirements](#requirements)  
[Run Locally](#run-locally)  
[Manage your database using migrations](#manage-your-database-using-migrations)  
[Run test](#run-test)  
[FAQ](#faq)  
[Dependencies](#dependencies)  
[Extras](#extras)

## Project Structure

The main app implementation is inside of the `/app` directory where it uses basic js node implementation.

```sh
"/routes": Routes of the application.
"/lib/db": Database structure. Migrations, seed and types.
"/app/cases": Use cases of your application.
"/app/repositories": Repositores and interfaces that are used by the use cases.

"/node.ts": Initial file to run the project using node.
"/bun.ts": Initial file to run the project using bun.
```

## Tech Stack

**Geral:** [Hono](https://hono.dev), [Zod](https://zod.dev), Eslint  
**Database:** [Kysely](https://kysely.dev) (queries, migrations, types)  
**Test:** [Bun test](https://bun.sh/docs/cli/test)

## Requirements

[node.js v20+](https://nodejs.org/en) or [bun](https://bun.sh)  
[nvm](https://github.com/nvm-sh/nvm#install--update-script) installed to manage node versions  
[pnpm](https://pnpm.io) to manage dependencies(npm install -g pnpm)

## Run Locally

<details>

<summary>📁 Setup your database</summary>

I recommend using [dbngin](https://dbngin.com) to spin up an local DB on your machine.

> [!NOTE]  
> If you prefer docker, you can use postgres service from [this docker compose](https://gist.github.com/marcosrjjunior/d5250416b5fe43d982f998c0b7744464)

Create your database

```
CREATE DATABASE project
```

</details>

#### **Update your environment variables**

Create a `.env` files from `.env.example` and populate the values.

```
cp .env.example .env
```

#### **Install your dependencies**

<details>

<summary>Nodejs</summary>

```sh
nvm use
pnpm install
```

</details>

<details>

<summary>Bun</summary>

```sh
bun install
```

</details>

#### **Run the project**

<details>

<summary>Nodejs</summary>

```sh
pnpm node:dev or pnpm dev
```

</details>

<details>

<summary>Bun</summary>

```sh
pnpm bun:dev
```

</details>

From here you should be getting a server running on `http://localhost:3333`

## Manage your database using migrations

Migrations are currently defined under `lib/db/migrations`. An initial migration is already there as an example, adjust to meet your project requirements. [Reference](https://kysely.dev/docs/migrations)

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

##### DB types

This project is using kanel to generate types, it handles better types and enums when using with postgres.  
If you need to use a different database, I recommend [kysely-codegen](https://github.com/RobinBlomberg/kysely-codegen) instead.

## Run test

Tests are implemented using bun which follows a jest-compatible structure.

```sh
pnpm test
```

> Reference: https://bun.sh/docs/cli/test#run-tests

## FAQ

<details>

<summary>Why this structure?</summary>

This is a personal preference, It also depends on your application and how you are deploying.

I've been using this case structure for some time and enjoying but still improving/learning as I go.

I usually try to find the middle term on structural side for various reasons.

Just a personal recommendation, try not get too attached to one framework or another. I believe you can get way more value spending time structuring your code, learning about patterns in a way that can benefit your team, projects, clients.

Again, feel free to adapt to your needs.

[Hono best practices](https://hono.dev/guides/best-practices#best-practices)  
[Hono presets](https://hono.dev/api/presets#which-preset-should-i-use)

</details>

<details>

<summary>Framework agnostic?</summary>

Thanks for the simplicity of hono you can basically structure your project in a way that fits your situation.

This core of this project is all under the `/app` directory, where I'm using only JS, none of the files there are related to hono. That means, if for some unexpected reason/scenario you need to move away from hono, you can just copy the app directory and make the requests to the cases accordinly.

</details>

<details>

<summary>Bun or node?</summary>

Because of this structure I can easily switch between them to test. Based on my situation and project, I'd still recommend to use nodejs.

There is a noticeable delay on requests to s3 using bun still. [Github Issue](https://github.com/oven-sh/bun/issues/7428#issuecomment-2132580081)

> Last test on: May 30, 2024

It all depends on your project and situation. Bun will probably be more performant and consume less memory, specially on a production environment. The only blocker for me at this point is the one mentioned above, so I still can't tell

I'm mainly using bun to run my tests and it work just fine since it is [based on jest](https://bun.sh/docs/cli/test).

</details>

<details>

<summary>Why hono?</summary>

[Features](https://hono.dev/top#features)

Coming from previous experiences using express.js and fastify. Hono is powerful, simple to use and has an active community.

Give it a go.

Here are some simple benchmarks (they don't mean much)  
[Requests benchmark](https://web-frameworks-benchmark.netlify.app/result?f=express,hono,fastify,hono-bun)  
[Compare benchmark](https://web-frameworks-benchmark.netlify.app/compare?f=express,hono,fastify,hono-bun)

If you still don't buy it, fastify it is also a great option.

</details>

## Dependencies

**Nodejs**

> To run the project using nodejs, we need some extra dependencies.
> These are already set in the project.

```
// dependencies
@hono/node-server

// devDependencies
typescript
ts-node-dev
```

---

## Extras

#### Adding sentry

- For the setup you can use the [hono middleware](https://github.com/honojs/middleware/tree/main/packages/sentry) created for that, you can follow the instructions on the readme there.

The setup is basically adding the middleware on the initial file.

```ts
...
import { sentry } from '@hono/sentry'
...

app.use(
  '*',
  sentry({
    dsn: process.env.SENTRY_DNS,
    tracesSampleRate: isProduction ? 0.2 : 0.8,
    environment,
  }),
)
```

Then you can call on your global `app.onError`

```ts
app.onError((error, c) => {
  c.get('sentry').captureException(e, {
    tags: {}, // any tag
    extra: {}, // any extra object
  })

  return c.json({ error, message: error.message || 'Unknown Error' }, 500)
})
```

#### Connection example using tursodb (sqlie)

- [Gist example](https://gist.github.com/marcosrjjunior/0a717f4b8b584a13fb36fdec4398d048)

---
