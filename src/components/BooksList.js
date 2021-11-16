import React, { useState, useEffect } from 'react'
import Book from './Book'
import BookEdit from './BookEdit'
import PropTypes from 'prop-types'
import * as requests from '../requests.js'

const sortByNameAndReturnNew = (booksToSort) => {
  const sortedBooks = Array.from(booksToSort)

  sortedBooks.sort((a, b) => {
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

  return sortedBooks
}

const BooksList = ({ booksData }) => {
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    requests.getGenres(booksData.setGenres)
    requests.getLanguages(booksData.setLanguages)
    requests.getVolumes(booksData.setVolumes)
    requests.getBooks(booksData.setBooks)
  }, [])

  const handleViewBook = (book) => {
    setSelectedBook(book)
  }

  return (
    <div className='grid-container' id='books-list'>
      {booksData.books && sortByNameAndReturnNew(booksData.books).map(b =>
        <Book
          book={b}
          key={b.id}
          handleRemoveBook={requests.removeBook}
          handleViewBook={handleViewBook}
          setBooks={booksData.setBooks}
          volumes={booksData.volumes.filter(e => e.book_id === b.id)}
          genre={booksData.genres.find(e => e.id === b.genre_id)}
          language={booksData.languages.find(e => e.id === b.language_id)} />
      )}
      {selectedBook && <BookEdit
        book={selectedBook}
        booksData={booksData} />
      }
    </div>
  )
}

BooksList.propTypes = {
  booksData: PropTypes.object
}

export default BooksList
