import { MINIMUN_PASSWORD_LENGTH, statusCodes } from '../../src/constants.js'
import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import path from 'path'
import fs from 'fs'

const __dirname = path.resolve()
const pathToKey = path.join(__dirname, 'server', 'id_rsa_priv.pem')

console.log(pathToKey)

const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

export const sendBadRequest = (message, response) => {
  return response.status(statusCodes.BAD_REQUEST).json(message)
}

export const sendInternalServerError = (message, response) => {
  return response.status(statusCodes.INTERNAL_SERVER_ERROR).json(message)
}

export const sendNotFound = (message, response) => {
  return response.status(statusCodes.NOT_FOUND).json(message)
}

export const sendConflict = (message, response) => {
  return response.status(statusCodes.CONFLICT).json(message)
}

export const validateString = (string) => {
  return typeof string === 'string'
}

export const validateNumber = (number) => {
  return typeof number === 'number'
}

export const handleQueryResults = (error, results, response) => {
  if (error) {
    return sendInternalServerError(error.message, response)
  }
  return response.status(200).json(results.rows)
}

export const validateBook = (name, releaseYear, genreId, languageId) => {
  return !validateString(name) || !validateNumber(releaseYear) ||
      !validateNumber(genreId) || !validateNumber(languageId)
}

export const validateRegister = (name, email, password, password2) => {
  const missingParameters = !name || !email || !password || !password2
  const passwordTooShort = password.length < MINIMUN_PASSWORD_LENGTH
  const differentPasswords = password !== password2

  return !missingParameters && !passwordTooShort && !differentPasswords
}

export const genPassword = (password) => {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

  return {
    salt: salt,
    hash: hash
  }
}

export const validPassword = (password, hash, salt) => {
  const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  console.log(hash)
  console.log(hashVerify)
  return hash === hashVerify
}

export const issueJWT = (user) => {
  const id = user.id
  const expiresIn = '1d'

  const payload = {
    sub: id,
    iat: Date.now()
  }

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' })

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn
  }
}
