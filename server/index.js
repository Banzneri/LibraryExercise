import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'
import passport from 'passport'
import initializePassport from './passportConfig.js'

initializePassport(passport)

const app = express()
const port = 3001

app.use(passport.initialize())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

routes(app, passport)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
