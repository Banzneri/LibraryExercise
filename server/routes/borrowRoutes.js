import * as borrowQueries from '../queries/borrowQueries.js'
import { isAuth, isAdmin } from './authMiddleWare.js'

const borrowRoutes = (app) => {
  app.get('/borrows', isAdmin, borrowQueries.getAllBorrows)
  app.get('/borrows/:id', isAuth, borrowQueries.getBorrowById)
  app.get('/borrows/user/:id', isAuth, borrowQueries.getBorrowsByUserId)
  app.get('/borrows/volume/:id', isAuth, borrowQueries.getBorrowByVolumeId)
}

export default borrowRoutes
