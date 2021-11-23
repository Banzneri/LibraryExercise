import * as React from 'react'
import PropTypes from 'prop-types'

const booksContext = React.createContext()

export function BooksProvider ({ children }) {
  const [books, setBooks] = React.useState([])
  const [genres, setGenres] = React.useState([])
  const [languages, setLanguages] = React.useState([])
  const [volumes, setVolumes] = React.useState([])

  const data = {
    books,
    setBooks,
    genres,
    setGenres,
    languages,
    setLanguages,
    volumes,
    setVolumes
  }

  return (
    <booksContext.Provider value={data}>
      {children}
    </booksContext.Provider>
  )
}

export function useBooks () {
  const context = React.useContext(booksContext)
  if (context === undefined) {
    throw new Error('no context')
  }
  return context
}

BooksProvider.propTypes = {
  children: PropTypes.object
}
