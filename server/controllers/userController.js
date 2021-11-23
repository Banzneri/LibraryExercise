import db from '../db.js'
import { handleQueryResults, sendBadRequest, validateNumber } from './utils.js'

export const getAllUsers = (request, response, next) => {
  const query = 'SELECT * FROM users'

  db.query(query, (error, results) =>
    handleQueryResults(error, results, response))
}

export const getUserById = (request, response, next) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  const query = 'SELECT * FROM users WHERE id = $1'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}
