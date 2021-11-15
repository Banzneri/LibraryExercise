import express from 'express'
import cors from 'cors'
import * as Queries from './queries.js'

const app = express()
const port = 3001

app.use(express.json())
app.use(cors())

// BOOKS
app.get('/books', Queries.getAllBooks)
app.get('/books/:id', Queries.getBookById)
app.post('/books', Queries.addBook)
app.put('/books/:id', Queries.updateBook)
app.delete('/books/:id', Queries.deleteBookById)

// BORROWS
app.get('/borrows', Queries.getAllBorrows)
app.get('/borrows/:id', Queries.getBorrowById)
app.get('/borrows/user/:id', Queries.getBorrowsByUserId)
app.get('/borrows/volume/:id', Queries.getBorrowByVolumeId)

// VOLUMES
app.get('/volumes', Queries.getAllVolumes)
app.get('/volumes/:id', Queries.getVolumesByBookId)
app.post('/volumes/:id', Queries.addVolume)

// GENRES
app.get('/genres', Queries.getGenres)
app.get('/genres/:id', Queries.getGenreById)

// LANGUAGES
app.get('/languages', Queries.getLanguages)
app.get('/languages/:id', Queries.getLanguageById)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
