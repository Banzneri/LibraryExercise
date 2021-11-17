import bookRoutes from './bookRoutes.js'
import borrowRoutes from './borrowRoutes.js'
import genreRoutes from './genreRoutes.js'
import languageRoutes from './languageRoutes.js'
import volumeRoutes from './volumeRoutes.js'
import authRoutes from './authRoutes.js'

const routes = (app, passport) => {
  bookRoutes(app)
  borrowRoutes(app)
  genreRoutes(app)
  languageRoutes(app)
  volumeRoutes(app)
  authRoutes(app, passport)
}

export default routes
