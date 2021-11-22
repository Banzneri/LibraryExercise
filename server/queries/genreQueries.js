import db from '../db.js'

export const getGenres = (request, response) => {
  db.query('SELECT * FROM genres', (error, results) => {
    if (error) {
      response.status(500).json({ message: 'database error', error: error })
    }
    response.status(200).json(results.rows)
  })
}

export const getGenreById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM genres WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).json({ message: 'database error', error: error })
    }
    response.status(200).json(results.rows)
  })
}
