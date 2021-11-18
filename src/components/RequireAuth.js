import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../Auth'
import PropTypes from 'prop-types'

export const RequireAuth = ({ children }) => {
  const { authed } = useAuth()

  return authed === true
    ? children
    : <Navigate to='/login' replace />
}

RequireAuth.propTypes = {
  children: PropTypes.object
}
