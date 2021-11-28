import React, { useEffect, useState } from 'react'
import { useBooks } from '../../contexts/BooksContext'
import { BookList } from './BookList'
import * as req from '../../requests.js'
import { BookDetailsModal } from '../BookDetailsModal'

export const BookListContainer = () => {
  const [selectedBook, setSelectedBook] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const { books, volumes } = useBooks()
  const { setBooks, setLanguages, setGenres, setVolumes } = useBooks()

  useEffect(() => {
    req.getGenres(setGenres)
    req.getLanguages(setLanguages)
    req.getVolumes(setVolumes)
    req.getBooks(setBooks)
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
        setBooks={setBooks}
        volumes={volumes}
        setSelectedBook={setSelectedBook}
        setShowEditModal={setShowEditModal} />
    </>
  )
}
