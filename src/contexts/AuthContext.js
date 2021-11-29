import * as React from 'react'
import PropTypes from 'prop-types'

const authContext = React.createContext()

export function AuthProvider ({ children }) {
  const [authed, setAuthed] = React.useState(false)
  const [admin, setAdmin] = React.useState(false)

  return (
    <authContext.Provider value={{ authed, setAuthed, admin, setAdmin }}>
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
