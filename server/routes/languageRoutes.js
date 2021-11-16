import * as languageQueries from '../queries/languageQueries.js'

const languageRoutes = (app) => {
  app.get('/languages', languageQueries.getLanguages)
  app.get('/languages/:id', languageQueries.getLanguageById)
}

export default languageRoutes
