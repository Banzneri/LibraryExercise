import * as userQueries from '../queries/userQueries.js'
import { isAdmin } from './authMiddleWare'

const userRoutes = (app) => {
  app.get('/users', isAdmin, userQueries.getAllUsers)
  app.get('/users/:id', isAdmin, userQueries.getUserById)
}

export default userRoutes
