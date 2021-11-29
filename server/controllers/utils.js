import { MINIMUN_PASSWORD_LENGTH, statusCodes } from '../../src/constants.js'

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
    console.log('errorrr')
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
