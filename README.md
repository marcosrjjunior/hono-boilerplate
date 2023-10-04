#### Bun

```
bun install
bun run dev
```

```
open http://localhost:3000
```

#### Nodejs

Set the correct nodejs version, run

```
nvm use
```

Install dependencies and run the project

```
pnpm install
pnpm run dev:node
```

```
open http://localhost:3000
```

Dependencies

```
ts-node-dev,
@hono/node-server
```

### Database

Create an initial database and make sure the env variables are correctly set

```
DATABASE_HOST=localhost
DATABASE_USER=postgres
DATABASE_PASSWORD=secret
DATABASE_PORT=5432
DATABASE_NAME=project
```

##### Run the initial migration

```
pnpm run db:migrate:up
```
