import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BooksList = ({ books, handleRemoveBook, handleViewBook, genres, languages }) => {
  return (
    <div className='grid-container' id='books-list'>
      {books.map(b =>
        <Book
          book = {b}
          key = {b.id}
          handleRemoveBook={handleRemoveBook}
          handleViewBook={handleViewBook}
          genre={genres.find(e => e.id === b.genre_id)}
          language={languages.find(e => e.id === b.language_id)} />
      )}
    </div>
  )
}

BooksList.propTypes = {
  books: PropTypes.array,
  handleRemoveBook: PropTypes.func,
  handleViewBook: PropTypes.func,
  genres: PropTypes.array,
  languages: PropTypes.array
}

export default BooksList
