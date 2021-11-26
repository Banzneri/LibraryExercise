import React, { useEffect, useState } from 'react'
import { useBooks } from '../contexts/BooksContext'
import { BookList } from './BookList'
import * as requests from '../requests.js'
import EditBookModal from './EditBookModal'

export const BookListContainer = () => {
  const [selectedBook, setSelectedBook] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const { books, languages, genres, volumes } = useBooks()
  const { setBooks, setLanguages, setGenres, setVolumes } = useBooks()

  useEffect(() => {
    requests.getGenres(setGenres)
    requests.getLanguages(setLanguages)
    requests.getVolumes(setVolumes)
    requests.getBooks(setBooks)
  }, [])

  const handleCloseBook = () => {
    setSelectedBook(null)
    setShowEditModal(false)
  }

  return (
    <>
      <EditBookModal
          book={selectedBook}
          show={showEditModal}
          handleClose={handleCloseBook} />
      <BookList
        books={books}
        languages={languages}
        genres={genres}
        volumes={volumes}
        setSelectedBook={setSelectedBook}
        setShowEditModal={setShowEditModal} />
    </>
  )
}
