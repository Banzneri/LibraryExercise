import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, handleRemoveBook, handleViewBook, setBooks, genre, language, volume }) => {
  return (
    <div className='book' onClick={() => handleViewBook(book)}>
      <div className='book-info'>
        <p><b>Name</b>: {book?.name}</p>
        <p><b>Year</b>: {book?.release_year}</p>
        <p><b>Genre</b>: {genre?.name}</p>
        <p><b>Language</b>: {language?.name}</p>
        <p><b>Quantity</b>: {volume?.length}</p>
      </div>
      <div className='book-buttons'>
        <input className='remove-book' type='button' value='X' onClick={(e) => handleRemoveBook(e, book.id, setBooks)} />
      </div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  handleRemoveBook: PropTypes.func,
  handleViewBook: PropTypes.func,
  setBooks: PropTypes.func,
  genre: PropTypes.object,
  language: PropTypes.object,
  volume: PropTypes.array
}

export default Book
