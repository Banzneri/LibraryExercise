import passportLocal from 'passport-local'
import db from './db.js'
import bcrypt from 'bcrypt'

const LocalStrategy = passportLocal.Strategy

const initialize = (passport) => {
  const authenticateUser = (email, password, done) => {
    db.query('SELECT * FROM users WHERE email = $1', [email], (error, results) => {
      if (error) {
        throw error
      } else {
        console.log(results.rows)

        if (results.rows.length > 0) {
          const user = results.rows[0]
          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
              throw error
            }

            if (isMatch) {
              console.log('Is match: ' + user)
              return done(null, user)
            } else {
              return done(null, false, { message: 'Password is not correct' })
            }
          })
        } else {
          return done(null, false, { message: 'Email is not registered' })
        }
      }
    })
  }
  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    authenticateUser
    )
  )

  passport.serializeUser((user, done) => done(null, user.id))

  passport.deserializeUser((id, done) => {
    console.log('deserializing: ' + id)
    db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      const user = results.rows[0]
      console.log('deserializing: ' + user)
      return done(null, user)
    })
  })
}

export default initialize
