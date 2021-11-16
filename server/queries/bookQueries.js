/* eslint-disable camelcase */
/* eslint-disable quotes */
import db from '../db.js'

export const getAllBooks = (request, response) => {
  const query = `SELECT books.id, books.name, books.release_year, books.genre_id, books.language_id FROM books`

  db.query(query, (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getBookById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const addBook = (request, response) => {
  const { name, releaseYear, genreId, languageId } = request.body
  const query = `INSERT INTO books (name, release_year, genre_id, language_id) 
                    VALUES ($1, $2, $3, $4) RETURNING id`

  db.query(query, [name, releaseYear, genreId, languageId], (error, results) => {
    if (error) {
      throw error
    }
    console.log('returning ' + results.rows)
    response.status(200).json(results.rows)
  })
}

export const updateBook = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, releaseYear, genreId, languageId } = request.body

  db.query(
    'UPDATE books SET name = $1, release_year = $2, genre_id = $3, language_id = $4 WHERE id = $5',
    [name, releaseYear, genreId, languageId, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Book modified with ID: ${id}`)
    }
  )
}

export const deleteBookById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query(
    'DELETE FROM books WHERE id = $1 RETURNING books', [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Book deleted with ID: ${id}`)
    }
  )
}
