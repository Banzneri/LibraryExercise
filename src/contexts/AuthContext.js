import * as React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { BASE_URL } from '../constants'

const authContext = React.createContext()

export function AuthProvider ({ children }) {
  const [authed, setAuthed] = React.useState(false)
  const [admin, setAdmin] = React.useState(false)
  const token = localStorage.getItem('token')

  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token
    }
  })

  return (
    <authContext.Provider value={{ authed, setAuthed, admin, setAdmin, authAxios }}>
      {children}
    </authContext.Provider>
  )
}

export function useAuth () {
  const context = React.useContext(authContext)
  if (context === undefined) {
    throw new Error('no context')
  }
  return context
}

AuthProvider.propTypes = {
  children: PropTypes.object
}
