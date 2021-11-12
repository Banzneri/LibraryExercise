import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, handleRemoveBook, handleViewBook, genre, language }) => {
  console.log(genre)
  return (
    <div className='book' onClick={() => handleViewBook(book)}>
      <div className='book-info'>
        <p><b>Name</b>: {book.name}</p>
        <p><b>Year</b>: {book.release_year}</p>
        <p><b>Genre</b>: {genre.name}</p>
        <p><b>Language</b>: {language.name}</p>
      </div>
      <div className='book-buttons'>
        <input className='remove-book' type='button' value='X' onClick={(e) => handleRemoveBook(e, book.id)}/>
      </div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  handleRemoveBook: PropTypes.func,
  handleViewBook: PropTypes.func,
  genre: PropTypes.object,
  language: PropTypes.object
}

export default Book
