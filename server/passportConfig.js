import db from './db.js'
import PassportJWT from 'passport-jwt'
import path from 'path'
import fs from 'fs'

const JwtStrategy = PassportJWT.Strategy
const ExtractJwt = PassportJWT.ExtractJwt

const __dirname = path.resolve()
const pathToKey = path.join(__dirname, 'server', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}

const initialize = (passport) => {
  const authenticateUser = (jwtPayload, done) => {
    const id = jwtPayload.sub
    db.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        return done(error, false)
      }
      const user = results.rows[0]
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
  }

  passport.use(
    new JwtStrategy(options, authenticateUser)
  )
}

export default initialize
