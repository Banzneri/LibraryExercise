import * as bookQueries from '../controllers/bookController.js'
import { isAuth, isAdmin } from './authMiddleWare.js'

const bookRoutes = (app) => {
  app.get('/books', isAuth(), bookQueries.getAllBooks)
  app.get('/booksAlt', isAuth(), bookQueries.getAllBooksAlt)
  app.get('/books/genres/:id', isAuth(), bookQueries.getBooksByGenreId)
  app.get('/books/:id', isAuth(), bookQueries.getBookById)
  app.get('/books/volumes/:id', isAuth(), bookQueries.getBookByVolumeId)
  app.post('/books', isAdmin, bookQueries.addBook)
  app.put('/books/:id', isAdmin, bookQueries.updateBook)
  app.delete('/books/:id', isAdmin, bookQueries.deleteBookById)
}

export default bookRoutes
