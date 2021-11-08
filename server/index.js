import express from 'express'
import cors from 'cors'
import
{
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  getGenres,
  getGenreById,
  deleteBookById
} from './queries.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

app.get('/books', getAllBooks)
app.get('/books/:id', getBookById)
app.post('/books', addBook)
app.put('/books/:id', updateBook)
app.delete('/books/:id', deleteBookById)

app.get('/genres', getGenres)
app.get('/genres/:id', getGenreById)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
