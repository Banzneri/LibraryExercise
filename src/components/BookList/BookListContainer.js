import React, { useEffect } from 'react'
import { useBooks } from '../../contexts/BooksContext'
import { BookList } from './BookList'
import PropTypes from 'prop-types'
import { getGenres, getLanguages, getVolumes } from '../../LibraryService.js'

export const BookListContainer = ({ page, books, setBooks }) => {
  const { setLanguages, setGenres, setVolumes } = useBooks()

  useEffect(() => {
    const update = async () => {
      setGenres(await getGenres())
      setLanguages(await getLanguages())
      setVolumes(await getVolumes())
    }
    update()
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
