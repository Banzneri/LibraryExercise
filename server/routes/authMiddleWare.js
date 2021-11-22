export const isAuth = (request, response, next) => {
  if (request.isAuthenticated()) {
    console.log('user is authenticated + ' + request.user.full_name)
    next()
  } else {
    response.status(401).json({ message: 'You are not authorized to view this resource ' })
  }
}

export const isAdmin = (request, response, next) => {
  if (request.user.role === 'ADMIN') {
    next()
  } else {
    response.status(401).json({ message: 'You are not authorized to view this resource' })
  }
}
