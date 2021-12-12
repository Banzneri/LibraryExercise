import * as borrowQueries from '../controllers/borrowController.js'
import { isAuth, isAdmin } from './authMiddleWare.js'

const borrowRoutes = (app) => {
  app.get('/borrows', isAdmin, borrowQueries.getAllBorrows)
  app.get('/borrows/:id', isAuth(), borrowQueries.getBorrowById)
  app.get('/borrows/user/:id', isAuth(), borrowQueries.getBorrowsByUserId)
  app.get('/borrows/volume/:id', isAuth(), borrowQueries.getBorrowByVolumeId)
  app.get('/user/borrows', isAuth(), borrowQueries.getBorrowsByCurrentUserId)
  app.post('/user/borrows/volume', isAuth(), borrowQueries.addBorrowByCurrentUserIdAndVolumeId)
  app.delete('/borrows/volumes/:id', isAuth(), borrowQueries.deleteBorrowByVolumeId)
  app.post('/user/borrows/books/:id', isAuth(), borrowQueries.borrowBookByCurrentUserAndBookId)
}

export default borrowRoutes
