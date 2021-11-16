import express from 'express'
import cors from 'cors'
import * as queries from './queries.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

// BOOKS
app.get('/books', queries.getAllBooks)
app.get('/books/:id', queries.getBookById)
app.post('/books', queries.addBook)
app.put('/books/:id', queries.updateBook)
app.delete('/books/:id', queries.deleteBookById)

// BORROWS
app.get('/borrows', queries.getAllBorrows)
app.get('/borrows/:id', queries.getBorrowById)
app.get('/borrows/user/:id', queries.getBorrowsByUserId)
app.get('/borrows/volume/:id', queries.getBorrowByVolumeId)

// VOLUMES
app.get('/volumes', queries.getAllVolumes)
app.get('/volumes/:id', queries.getVolumesByBookId)
app.post('/volumes/:id', queries.addVolume)

// GENRES
app.get('/genres', queries.getGenres)
app.get('/genres/:id', queries.getGenreById)

// LANGUAGES
app.get('/languages', queries.getLanguages)
app.get('/languages/:id', queries.getLanguageById)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
