import { createRouter } from '../../platform/http/router'
import countUsers from './count-users/count-users.routes'
import createUser from './create-user/create-user.routes'

const app = createRouter()

app.route('/', createUser)
app.route('/', countUsers)

export default app
