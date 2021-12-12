import * as authControllers from '../controllers/authController.js'
import { isAuth } from './authMiddleWare.js'

const authRoutes = (app) => {
  app.post('/users/register', authControllers.registerUser)
  app.post('/users/login', authControllers.loginUser)
  app.get('/users/login/success', isAuth(), authControllers.loginSuccess)
  app.get('/users/login/failed', authControllers.loginFailed)
  app.get('/users/logout', authControllers.logout)
}

export default authRoutes
