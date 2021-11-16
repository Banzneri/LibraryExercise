import * as genreQueries from '../queries/genreQueries.js'

const genreRoutes = (app) => {
  app.get('/genres', genreQueries.getGenres)
  app.get('/genres/:id', genreQueries.getGenreById)
}

export default genreRoutes
