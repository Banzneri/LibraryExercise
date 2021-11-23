export const BASE_URL = 'http://localhost:3001'

export const MINIMUN_PASSWORD_LENGTH = 6

export const statusCodes = {
  OK: 200,
  CREATED: 201,

  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,

  INTERNAL_SERVER_ERROR: 500
}

export const errorMessages = {
  USER_NOT_FOUND: 'User not found',
  UNKNOWN_ENDPOINT: 'Unknown endpoint',
  EMAIL_TAKEN: 'Email is taken',
  MISSING_PARAMETERS: 'Missing parameters',
  INTERNAL_SERVER_ERROR: 'Internal server error',
  UNAUTHORIZED: 'Unauthorized',
  NOT_FOUND: 'Not found',
  PASSWORD_TOO_SHORT: 'Password too short',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match'
}
