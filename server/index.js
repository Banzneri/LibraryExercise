import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import session from 'express-session'
import passport from 'passport'
import initializePassport from './passportConfig.js'

initializePassport(passport)

const app = express()
const port = 3001

const sessionOptions = {
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}

app.use(express.json())
app.use(cors())
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

routes(app, passport)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
