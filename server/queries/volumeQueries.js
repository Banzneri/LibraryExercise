import db from '../db.js'

export const getAllVolumes = (request, response) => {
  db.query('SELECT * FROM volumes', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const getVolumesByBookId = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('SELECT * FROM volumes WHERE book_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

export const addVolume = (request, response) => {
  const id = parseInt(request.params.id)

  db.query('INSERT INTO volumes (book_id) VALUES ($1)', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`Added a new volume for the book id: ${id}`)
  })
}
