import { app } from './app'
import { serve } from '@hono/node-server'

serve({ ...app, port: +(process.env.PORT as string) }, info => {
  console.log(`Listening on http://localhost:${info.port}`)
})
