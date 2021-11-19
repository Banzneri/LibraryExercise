import * as authQueries from '../queries/authQueries.js'
import { isAuth } from './authMiddleWare.js'

const authRoutes = (app, passport) => {
  app.post('/users/register', authQueries.registerUser)
  app.post('/users/login', passport.authenticate('local', {
    successRedirect: '/users/login/success',
    failureRedirect: '/users/login/failed'
  }))
  app.get('/users/login/success', isAuth, authQueries.loginSuccess)
  app.get('/users/login/failed', authQueries.loginFailed)
}

export default authRoutes
