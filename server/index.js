import express from 'express'
import cors from 'cors'
import routes from './routes/routes.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

routes(app)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
