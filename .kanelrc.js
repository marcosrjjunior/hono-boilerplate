const { makeKyselyHook } = require('kanel-kysely')
require('dotenv').config()

/** @type {import('kanel').Config} */
module.exports = {
  connection: {
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
  },

  preDeleteOutputFolder: true,
  outputPath: './src/lib/db/schema',

  preRenderHooks: [makeKyselyHook()],
}
