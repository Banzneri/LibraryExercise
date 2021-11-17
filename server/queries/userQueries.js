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
