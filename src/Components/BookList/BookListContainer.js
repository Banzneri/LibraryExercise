import React, { useEffect, useState } from 'react'
import { useBooks } from '../../contexts/BooksContext'
import { BookList } from './BookList'
import * as req from '../../requests.js'
import { BookDetailsModal } from '../Book/BookDetailsModal'
import PropTypes from 'prop-types'

export const BookListContainer = ({ page }) => {
  const [selectedBook, setSelectedBook] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const { books } = useBooks()
  const { setLanguages, setGenres, setVolumes } = useBooks()

  useEffect(() => {
    req.updateGenres(setGenres)
    req.updateLanguages(setLanguages)
    req.updateVolumes(setVolumes)
  }, [])

  const handleCloseBook = () => {
    setSelectedBook(null)
    setShowEditModal(false)
  }

  return (
    <>
      <BookDetailsModal
        book={selectedBook}
        show={showEditModal}
        handleClose={handleCloseBook} />
      <BookList
        books={books}
        page={page} />
    </>
  )
}

BookListContainer.propTypes = {
  page: PropTypes.string
}
