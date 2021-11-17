import * as authQueries from '../queries/authQueries.js'

const authRoutes = (app, passport) => {
  app.post('/users/register', authQueries.registerUser)
  app.post('/users/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: false
  }))
}

export default authRoutes
