import bookRoutes from './bookRoutes.js'
import borrowRoutes from './borrowRoutes.js'
import genreRoutes from './genreRoutes.js'
import languageRoutes from './languageRoutes.js'
import volumeRoutes from './volumeRoutes.js'

const routes = (app) => {
  bookRoutes(app)
  borrowRoutes(app)
  genreRoutes(app)
  languageRoutes(app)
  volumeRoutes(app)
}

export default routes
