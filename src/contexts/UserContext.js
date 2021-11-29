import * as React from 'react'
import PropTypes from 'prop-types'

const userContext = React.createContext()

export function UserProvider ({ children }) {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [role, setRole] = React.useState('')

  return (
    <userContext.Provider value={{ name, setName, email, setEmail, role, setRole }}>
      {children}
    </userContext.Provider>
  )
}

export function useUser () {
  const context = React.useContext(userContext)
  if (context === undefined) {
    throw new Error('no context')
  }
  return context
}

UserProvider.propTypes = {
  children: PropTypes.object
}
