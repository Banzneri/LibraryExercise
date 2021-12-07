import db from '../db.js'
import { handleQueryResults, sendBadRequest, validateNumber } from './utils.js'

export const getAllVolumes = (request, response) => {
  db.query('SELECT * FROM volumes', (error, results) =>
    handleQueryResults(error, results, response))
}

export const getVolumesByBookId = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  const query = 'SELECT * FROM volumes WHERE book_id = $1'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}

export const getFreeVolumesByBookId = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  const query = `SELECT * FROM volumes
                 WHERE volumes.book_id = $1
                 AND volumes.id NOT IN
                 (SELECT borrows.volume_id
                 FROM borrows)`

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}

export const addVolume = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  const query = 'INSERT INTO volumes (book_id) VALUES ($1)'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}

export const deleteFreeVolumeByBookId = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    sendBadRequest('Bad request', response)
  }

  const query = `DELETE FROM volumes
                 WHERE volumes.book_id = $1
                 AND volumes.id IN
                 (SELECT volumes.id FROM volumes LIMIT 1)
                 AND volumes.id NOT IN
                 (SELECT borrows.volume_id FROM borrows)`

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}
