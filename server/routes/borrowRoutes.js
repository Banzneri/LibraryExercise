import * as borrowQueries from '../queries/borrowQueries.js'

const borrowRoutes = (app) => {
  app.get('/borrows', borrowQueries.getAllBorrows)
  app.get('/borrows/:id', borrowQueries.getBorrowById)
  app.get('/borrows/user/:id', borrowQueries.getBorrowsByUserId)
  app.get('/borrows/volume/:id', borrowQueries.getBorrowByVolumeId)
}

export default borrowRoutes
