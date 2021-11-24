import * as authControllers from '../controllers/authController.js'
import { isAuth } from './authMiddleWare.js'

const authRoutes = (app, passport) => {
  app.post('/users/register', authControllers.registerUser)
  app.post('/users/login', passport.authenticate('local', {
    successRedirect: '/users/login/success',
    failureRedirect: '/users/login/failed'
  }))
  app.get('/users/login/success', isAuth, authControllers.loginSuccess)
  app.get('/users/login/failed', authControllers.loginFailed)
  app.get('/users/logout', isAuth, authControllers.logout)
}

export default authRoutes
