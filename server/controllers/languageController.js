import db from '../db.js'
import { handleQueryResults, sendBadRequest, validateNumber } from './utils.js'

export const getLanguages = (request, response) => {
  db.query('SELECT * FROM languages', (error, results) =>
    handleQueryResults(error, results, response))
}

export const getLanguageById = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  db.query('SELECT * FROM languages WHERE id = $1', [id], (error, results) =>
    handleQueryResults(error, results, response))
}
