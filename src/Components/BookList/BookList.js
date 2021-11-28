import React from 'react'
import BookCard from '../BookCard'
import PropTypes from 'prop-types'
import { removeBook } from '../../requests.js'
import { Col } from 'react-bootstrap'

export const BookList = ({
  books,
  setBooks,
  volumes,
  setSelectedBook,
  setShowEditModal
}) => {
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

  const handleViewBook = (book) => {
    setSelectedBook(book)
    setShowEditModal(true)
  }

  const sortedBooks = sortByNameAndReturnNew(books)

  return (
    <>
      {books && sortedBooks.map(b =>
        <Col sm={4} key={b.volume_id || b.id}>
          <BookCard
            book={b}
            handleRemoveBook={removeBook}
            handleViewBook={handleViewBook}
            setBooks={setBooks}
            volume={volumes.filter(e => e.book_id === b.id)} />
        </Col>
      )}
    </>
  )
}

BookList.propTypes = {
  books: PropTypes.array,
  setBooks: PropTypes.func,
  volumes: PropTypes.array,
  setSelectedBook: PropTypes.func,
  setShowEditModal: PropTypes.func
}
