/* eslint-disable camelcase */
import pg from 'pg'

const Pool = pg.Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sqlpractice',
  password: 'Jaakkola12',
  port: 5432
})

// BOOK QUERIES
const getAllBooks = (request, response) => {
  const query = `SELECT books.id, books.name, books.release_year, genres.name AS genre, languages.name AS language
                FROM books 
                INNER JOIN genres ON genres.id = books.genre_id 
                INNER JOIN languages ON languages.id = books.language_id`
  // eslint-disable-next-line quotes
  pool.query(query, (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    console.log(results.rows)
    response.status(200).json(results.rows)
  })
}

const getBookById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addBook = (request, response) => {
  const { name, release_year, genre_id, language_id } = request.body
  const query = `INSERT INTO books (name, release_year, genre_id, language_id) 
                  VALUES ($1, $2, $3, $4)`

  pool.query(query, [name, release_year, genre_id, language_id], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
  })
}

const updateBook = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, release_year, genre_id, language_id } = request.body

  pool.query(
    'UPDATE books SET name = $1, release_year = $2, genre_id = $3, language_id = $4 WHERE id = $5',
    [name, release_year, genre_id, language_id, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Book modified with ID: ${id}`)
    }
  )
}

const deleteBookById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query(
    'DELETE FROM books WHERE id = $1', [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Book deleted with ID: ${id}`)
    }
  )
}

// GENRE QUERIES
const getGenres = (request, response) => {
  pool.query('SELECT * FROM genres', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getGenreById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM genres WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export
{
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  getGenres,
  getGenreById,
  deleteBookById
}
