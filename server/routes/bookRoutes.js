import * as bookQueries from '../queries/bookQueries.js'
import { isAuth } from './authMiddleWare.js'

const bookRoutes = (app) => {
  app.get('/books', isAuth, bookQueries.getAllBooks)
  app.get('/booksAlt', isAuth, bookQueries.getAllBooksAlt)
  app.get('/books/genres/:id', isAuth, bookQueries.getBooksByGenreId)
  app.get('/books/:id', isAuth, bookQueries.getBookById)
  app.post('/books', isAuth, bookQueries.addBook)
  app.put('/books/:id', isAuth, bookQueries.updateBook)
  app.delete('/books/:id', isAuth, bookQueries.deleteBookById)
}

export default bookRoutes
