import React from 'react'
import BookCard from '../Book/BookCard'
import PropTypes from 'prop-types'
import { getBooks, removeBook } from '../../LibraryService.js'
import { Col } from 'react-bootstrap'

export const BookList = ({ books, setBooks, page }) => {
  const getSortedArray = (booksToSort) => {
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

  const handleRemoveBook = async (e, id) => {
    e.stopPropagation()
    await removeBook(id)
    const books = await getBooks()
    setBooks(books)
  }

  const sortedBooks = getSortedArray(books)

  return (
    <>
      {sortedBooks && sortedBooks.map(b =>
        <Col sm={4} key={page === 'borrows' ? b.volume_id : b.id}>
          <BookCard
            book={b}
            handleRemoveBook={(e) => handleRemoveBook(e, b.id)}
            page={page}
            setBooks={setBooks}/>
        </Col>
      )}
    </>
  )
}

BookList.propTypes = {
  books: PropTypes.array,
  page: PropTypes.string,
  setBooks: PropTypes.func
}
