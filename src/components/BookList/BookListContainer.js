import React, { useEffect } from 'react'
import { useBooks } from '../../contexts/BooksContext'
import { BookList } from './BookList'
import * as req from '../../requests.js'
import PropTypes from 'prop-types'

export const BookListContainer = ({ page, books, setBooks }) => {
  const { setLanguages, setGenres, setVolumes } = useBooks()

  useEffect(() => {
    req.updateGenres(setGenres)
    req.updateLanguages(setLanguages)
    req.updateVolumes(setVolumes)
  }, [])

  return (
    <>
      <BookList
        books={books}
        page={page}
        setBooks={setBooks} />
    </>
  )
}

BookListContainer.propTypes = {
  page: PropTypes.string,
  books: PropTypes.array,
  setBooks: PropTypes.func
}
