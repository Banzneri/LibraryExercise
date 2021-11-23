import db from '../db.js'
import { handleQueryResults, sendBadRequest, validateNumber } from './utils.js'

export const getGenres = (request, response) => {
  db.query('SELECT * FROM genres', (error, results) =>
    handleQueryResults(error, results, response))
}

export const getGenreById = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  db.query('SELECT * FROM genres WHERE id = $1', [id], (error, results) =>
    handleQueryResults(error, results, response))
}
