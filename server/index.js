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
  deleteBookById,
  getLanguages,
  getLanguageById
} from './queries.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

// BOOKS
app.get('/books', getAllBooks)
app.get('/books/:id', getBookById)
app.post('/books', addBook)
app.put('/books/:id', updateBook)
app.delete('/books/:id', deleteBookById)

// GENRES
app.get('/genres', getGenres)
app.get('/genres/:id', getGenreById)

// LANGUAGES
app.get('/languages', getLanguages)
app.get('/languages/:id', getLanguageById)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
