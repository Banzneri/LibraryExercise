import React, { useState, useEffect } from 'react'
import Book from './Book'
import BookEdit from './BookEdit'
import { FilterBooks } from './FilterBooks'
import * as requests from '../requests.js'
import { useBooks } from '../contexts/BooksContext'
import { Col, Container, Row } from 'react-bootstrap'

const sortByNameAndReturnNew = (booksToSort) => {
  return Array.from(booksToSort).sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()

    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
}

export const BooksList = () => {
  const { books, languages, genres, volumes } = useBooks()
  const { setBooks, setLanguages, setGenres, setVolumes } = useBooks()
  const [selectedBook, setSelectedBook] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)

  useEffect(() => {
    requests.getGenres(setGenres)
    requests.getLanguages(setLanguages)
    requests.getVolumes(setVolumes)
    requests.getBooks(setBooks)
  }, [])

  const handleViewBook = (book) => {
    setSelectedBook(book)
    setShowEditModal(true)
  }

  const handleCloseBook = () => {
    setSelectedBook(null)
    setShowEditModal(false)
  }

  const sortedBooks = sortByNameAndReturnNew(books)

  return (
    <Container>
      <FilterBooks />
      <BookEdit
          book={selectedBook}
          show={showEditModal}
          handleClose={handleCloseBook} />
      <Container>
        <Row>
          {books && sortedBooks.map(b =>
            <Col sm={4} key={b.id}>
              <Book
                book={b}
                handleRemoveBook={requests.removeBook}
                handleViewBook={handleViewBook}
                setBooks={setBooks}
                volume={volumes.filter(e => e.book_id === b.id)}
                genre={genres.find(e => e.id === b.genre_id)}
                language={languages.find(e => e.id === b.language_id)} />
            </Col>
          )}
        </Row>
      </Container>
    </Container>
  )
}
