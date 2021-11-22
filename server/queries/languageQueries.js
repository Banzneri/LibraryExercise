import db from '../db.js'

export const getLanguages = (request, response) => {
  db.query('SELECT * FROM languages', (error, results) => {
    if (error) {
      response.status(500).json({ message: 'database error', error: error })
    }
    response.status(200).json(results.rows)
  })
}

export const getLanguageById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM languages WHERE id = $1', [id], (error, results) => {
    if (error) {
      response.status(500).json({ message: 'database error', error: error })
    }
    response.status(200).json(results.rows)
  })
}
