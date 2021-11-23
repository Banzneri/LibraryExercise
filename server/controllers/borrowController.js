import db from '../db.js'
import { sendBadRequest, handleQueryResults, validateNumber } from './utils.js'

export const getAllBorrows = (request, response) => {
  const query = 'SELECT * FROM borrows'

  db.query(query, (error, results) =>
    handleQueryResults(error, results, response))
}

export const getBorrowById = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  const query = 'SELECT * FROM borrows WHERE id = $1'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}

export const getBorrowsByUserId = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  const query = 'SELECT * FROM borrows WHERE user_id = $1'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}

export const getBorrowByVolumeId = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  const query = 'SELECT * FROM borrows WHERE volume_id = $1'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}
