import * as bookQueries from '../queries/bookQueries.js'

const bookRoutes = (app) => {
  app.get('/books', bookQueries.getAllBooks)
  app.get('/booksAlt', bookQueries.getAllBooksAlt)
  app.get('/books/:id', bookQueries.getBookById)
  app.post('/books', bookQueries.addBook)
  app.put('/books/:id', bookQueries.updateBook)
  app.delete('/books/:id', bookQueries.deleteBookById)
}

export default bookRoutes
