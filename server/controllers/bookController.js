import db from '../db.js'
import { handleQueryResults, sendBadRequest, validateBook, validateNumber } from './utils.js'

export const getAllBooks = (request, response) => {
  const query = 'SELECT id, name, release_year, genre_id, language_id FROM books'

  db.query(query, (error, results) =>
    handleQueryResults(error, results, response))
}

export const getAllBooksAlt = (request, response) => {
  const query = `SELECT books.id, books.name, books.release_year, genres.name, languages.name 
                 FROM books 
                 INNER JOIN genres ON books.genre_id = genres.id
                 INNER JOIN languages ON books.language_id = languages.id`

  db.query(query, (error, results) =>
    handleQueryResults(error, results, response))
}

export const getBooksByGenreId = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    return sendBadRequest('Bad request', response)
  }

  const query = 'SELECT * FROM books WHERE books.genre_id = $1'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}

export const getBookById = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    return sendBadRequest('Bad request', response)
  }

  const query = 'SELECT * FROM books WHERE id = $1'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}

export const getBookByVolumeId = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    return sendBadRequest('Bad request', response)
  }

  const query = `SELECT b.id, b.name, b.release_year, b.genre_id, b.language_id, v.id as volume_id FROM books b
                 INNER JOIN volumes v
                 ON v.book_id = b.id
                 WHERE v.id = $1`

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}

export const addBook = (request, response) => {
  const { name, releaseYear, genreId, languageId } = request.body

  if (!validateBook(name, releaseYear, genreId, languageId)) {
    return sendBadRequest('Bad request', response)
  }

  const query = `INSERT INTO books
                 (name, release_year, genre_id, language_id)
                 VALUES ($1, $2, $3, $4) RETURNING id`

  db.query(query, [name, releaseYear, genreId, languageId], (error, results) =>
    handleQueryResults(error, results, response))
}

export const updateBook = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, releaseYear, genreId, languageId } = request.body

  if (!validateBook(name, releaseYear, genreId, languageId) ||
      !validateNumber(id)) {
    return sendBadRequest('Bad request', response)
  }

  const query = `UPDATE books 
                 SET name = $1, release_year = $2, genre_id = $3, language_id = $4 
                 WHERE id = $5`

  db.query(query, [name, releaseYear, genreId, languageId, id],
    (error, results) => handleQueryResults(error, results, response))
}

export const deleteBookById = (request, response) => {
  const id = parseInt(request.params.id)

  if (!validateNumber(id)) {
    return sendBadRequest('Bad request', response)
  }

  const query = 'DELETE FROM books WHERE id = $1 RETURNING books'

  db.query(query, [id], (error, results) =>
    handleQueryResults(error, results, response))
}
