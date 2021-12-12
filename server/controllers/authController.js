import db from '../db.js'
import {
  handleQueryResults,
  sendBadRequest,
  sendConflict,
  sendInternalServerError,
  validateRegister,
  genPassword,
  validPassword,
  issueJWT
} from './utils.js'

const addUser = (response, name, email, hash, salt) => {
  const now = Date.now()

  const query = `INSERT INTO users (full_name, email, role, created_at, hash, salt) 
                 VALUES ($1, $2, $3, to_timestamp(${now} / 1000.0), $4, $5) 
                 RETURNING *`

  db.query(query, [name, email, 'REGULAR', hash, salt], (error, results) =>
    handleQueryResults(error, results, response))
}

export const registerUser = async (request, response) => {
  const { name, email, password, password2 } = request.body

  const errors = []

  if (!validateRegister(name, email, password, password2)) {
    return sendBadRequest('Can\'t register user', response)
  }

  const saltHash = genPassword(password)
  const salt = saltHash.salt
  const hash = saltHash.hash
  console.log(salt + ' ' + hash)

  const query = 'SELECT * FROM users WHERE email = $1'

  db.query(query, [email], (error, results) => {
    if (error) {
      return sendInternalServerError(error.message, response)
    }

    if (results.rows.length > 0) {
      return sendConflict(errors, response)
    }

    addUser(response, name, email, hash, salt)
  })
}

export const loginUser = async (request, response) => {
  const { email, password } = request.body

  const query = 'SELECT * FROM users WHERE email = $1'

  db.query(query, [email], (error, results) => {
    if (error) {
      return sendInternalServerError(error.message, response)
    }

    if (results.rows.length === 0) {
      return response.status(401).json({ message: 'User not found' })
    }

    const user = results.rows[0]

    const isValid = validPassword(password, user.hash, user.salt)

    if (isValid) {
      const tokenObject = issueJWT(user)

      return response.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires, user: user })
    } else {
      response.status(401).json({ success: false, message: 'you entered the wrong password' })
    }
  })
}

export const loginSuccess = (request, response) => {
  return response.status(200).json(request.user)
}

export const loginFailed = (request, response) => {
  sendBadRequest('User not found', response)
}

export const logout = (request, response) => {
  response.status(200).json({ message: 'Logout successful', user: request.user })
}
