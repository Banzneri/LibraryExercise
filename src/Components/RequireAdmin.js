import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import PropTypes from 'prop-types'

export const RequireAdmin = ({ children }) => {
  const { authed } = useAuth()

  return authed === true
    ? children
    : <Navigate to='/login' replace />
}

RequireAdmin.propTypes = {
  children: PropTypes.object
}
