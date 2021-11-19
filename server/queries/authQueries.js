import db from '../db.js'
import bcrypt from 'bcrypt'

const addUser = (name, email, password) => {
  const now = Date.now()
  // eslint-disable-next-line quotes
  const query = `INSERT INTO users (full_name, email, password, role, created_at) VALUES ($1, $2, $3, $4, to_timestamp(${now} / 1000.0)) RETURNING id, password`
  db.query(query, [name, email, password, 'REGULAR'], (error, results) => {
    if (error) {
      throw error
    } else {
      console.log(results.rows)
    }
  })
}

export const registerUser = async (request, response, next) => {
  const { name, email, password, password2 } = request.body

  const errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ message: 'Please enter all fields' })
  }

  if (password.length < 6) {
    errors.push({ message: 'Password needs to be at least 6 characters' })
  }

  if (password !== password2) {
    errors.push({ message: 'Passwords do not match' })
  }

  if (errors.length > 0) {
    response.status(400).json({ errors: errors })
  } else {
    const query = 'SELECT * FROM users WHERE email = $1'
    const hashedPassword = await bcrypt.hash(password, 10)

    db.query(query, [email], (error, results) => {
      if (error) {
        throw error
      } else {
        if (results.rows.length > 0) {
          errors.push({ message: 'User already exists' })
          response.status(409).json({ errors: errors })
        } else {
          response.status(200).json({ message: 'User created' })
          addUser(name, email, hashedPassword)
        }
      }
    })
  }
}

export const loginSuccess = (request, response, next) => {
  response.status(200).json({ message: 'login successful' })
}

export const loginFailed = (request, response) => {
  response.status(400).json({ message: 'login failed' })
}

export const logout = (request, response) => {
  request.logout()
  response.status(200).json({ message: 'logout successful' })
}
