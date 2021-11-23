import db from '../db.js'
import bcrypt from 'bcrypt'
import {
  handleQueryResults,
  sendBadRequest,
  sendConflict,
  sendInternalServerError,
  validateRegister
} from './utils.js'

const addUser = (response, request, name, email, password) => {
  const now = Date.now()

  const query = `INSERT INTO users (full_name, email, password, role, created_at) 
                 VALUES ($1, $2, $3, $4, to_timestamp(${now} / 1000.0)) 
                 RETURNING id, password`

  db.query(query, [name, email, password, 'REGULAR'], (error, results) =>
    handleQueryResults(error, results, response))
}

export const registerUser = async (request, response, next) => {
  const { name, email, password, password2 } = request.body

  const errors = []

  if (!validateRegister(name, email, password, password2)) {
    sendBadRequest('Missing parameters', response)
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const query = 'SELECT * FROM users WHERE email = $1'

  db.query(query, [email], (error, results) => {
    if (error) {
      sendInternalServerError(error.message, response)
    }

    if (results.rows.length > 0) {
      sendConflict(errors, response)
    } else {
      addUser(response, request, name, email, hashedPassword)
    }
  })
}

export const loginSuccess = (request, response, next) => {
  response.status(200).json({ message: 'Login successful' })
}

export const loginFailed = (request, response) => {
  sendBadRequest('User not found', response)
}

export const logout = (request, response) => {
  request.logout()
  response.status(200).json({ message: 'Logout successful' })
}