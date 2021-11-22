import db from '../db.js'

export const getAllUsers = (request, response, next) => {
  const query = 'SELECT * FROM users'

  db.query(query, (error, results) => {
    if (error) {
      console.log(error)
      next(error)
    } else {
      response.status(200).json(results.rows)
    }
  })
}

export const getUserById = (request, response, next) => {
  const id = parseInt(request.params.id)
  const query = 'SELECT * FROM users WHERE id = $1'

  db.query(query, [id], (error, results) => {
    if (error) {
      response.status(500).json({ message: 'database error', error: error })
    }
    response.status(200).json(results.rows)
  })
}
