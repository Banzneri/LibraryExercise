/* eslint-disable quotes */
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

// function getRequest(query, params) {
//   pool.query(query, params)
// }

// BOOK QUERIES
export const getAllBooks = (request, response) => {
  const query = `SELECT books.id, books.name, books.release_year, books.genre_id, books.language_id FROM books`

  pool.query(query, (error, results) => {
    if (error) {
      console.log(error)
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getBookById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM books WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const addBook = (request, response) => {
  const { name, release_year, genre_id, language_id } = request.body
  const query = `INSERT INTO books (name, release_year, genre_id, language_id) 
                  VALUES ($1, $2, $3, $4) RETURNING id`

  pool.query(query, [name, release_year, genre_id, language_id], (error, results) => {
    if (error) {
      throw error
    }
    console.log('returning ' + results.rows)
    response.status(200).json(results.rows)
  })
}

export const updateBook = (request, response) => {
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

export const deleteBookById = (request, response) => {
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

// BORROWS QUERIES
export const getAllBorrows = (request, response) => {
  const query = `SELECT * FROM borrows`

  pool.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getBorrowById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM borrows WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getBorrowsByUserId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM borrows WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getBorrowByVolumeId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM borrows WHERE volume_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// VOLUMES QUERIES
export const getAllVolumes = (request, response) => {
  pool.query('SELECT * FROM volumes', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getVolumesByBookId = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM volumes WHERE book_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const addVolume = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('INSERT INTO volumes (book_id) VALUES ($1)', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Added a new volume for the book id: ${id}`)
  })
}

// GENRE QUERIES
export const getGenres = (request, response) => {
  pool.query('SELECT * FROM genres', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getGenreById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM genres WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// LANGUAGE QUERIES
export const getLanguages = (request, response) => {
  pool.query('SELECT * FROM languages', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getLanguageById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM languages WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
