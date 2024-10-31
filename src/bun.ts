import { app } from './app'

export default {
  ...app,
  port: process.env.PORT,
}
