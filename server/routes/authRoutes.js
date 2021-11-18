import * as authQueries from '../queries/authQueries.js'

const authRoutes = (app, passport) => {
  app.post('/users/register', authQueries.registerUser)
  app.post('/users/login', passport.authenticate('local'), authQueries.loginUser)
}

export default authRoutes
