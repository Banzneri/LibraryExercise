import db from '../db.js'

export const getAllBorrows = (request, response) => {
  const query = 'SELECT * FROM borrows'

  db.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getBorrowById = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM borrows WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getBorrowsByUserId = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM borrows WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getBorrowByVolumeId = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM borrows WHERE volume_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
