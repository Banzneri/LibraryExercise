import passport from 'passport'

export const isAuth = () => {
  const middleware = passport.authenticate('jwt', { session: false })
  return middleware
}

export const isAdmin = (request, response, next) => {
  if (request.user.role === 'ADMIN') {
    next()
  } else {
    response.status(401).json({ message: 'You are not authorized to view this resource' })
  }
}
