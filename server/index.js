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
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

routes(app, passport)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
