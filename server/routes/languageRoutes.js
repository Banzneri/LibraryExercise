import * as languageQueries from '../controllers/languageController.js'

const languageRoutes = (app) => {
  app.get('/languages', languageQueries.getLanguages)
  app.get('/languages/:id', languageQueries.getLanguageById)
}

export default languageRoutes
