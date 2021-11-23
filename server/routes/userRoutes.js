import * as userQueries from '../controllers/userController.js'
import { isAdmin } from './authMiddleWare'

const userRoutes = (app) => {
  app.get('/users', isAdmin, userQueries.getAllUsers)
  app.get('/users/:id', isAdmin, userQueries.getUserById)
}

export default userRoutes
