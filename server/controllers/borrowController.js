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

export const getBorrowsByCurrentUserId = (request, response) => {
  const id = parseInt(request.user.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  const query = 'SELECT * FROM borrows WHERE user_id = $1'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}

export const addBorrowByCurrentUserIdAndVolumeId = (request, response) => {
  const userId = request.user.id
  const now = Date.now()
  const inTwoWeeks = Date.now()
  const { volumeId } = request.body

  console.log('user: ' + userId + 'in two weeks: ' + inTwoWeeks + ' volumeId: ' + volumeId)

  if (!validateNumber(userId)) {
    sendBadRequest('Bad request', response)
  }

  const query = `INSERT INTO borrows
                 (volume_id, user_id, borrowed_at, due_date, returned_at)
                 VALUES ($1, $2, to_timestamp(${now} / 1000.0), to_timestamp(${inTwoWeeks} / 1000.0), null)`

  db.query(query, [volumeId, userId], (error, results) =>
    handleQueryResults(error, results, response))
}
