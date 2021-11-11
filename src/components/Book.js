import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, handleRemoveBook }) => {
  return (
      <div className='book-description flex-container space-between'>
        <div className='bood-description-info'>
          <p><b>Name</b>: {book.name}</p>
          <p><b>Genre</b>: {book.genre}</p>
          <p><b>Year</b>: {book.release_year}</p>
          <p><b>Language</b>: {book.language}</p>
        </div>
        <div className='remove-book-icon'>
          <input type='submit' value='remove' onClick={() => handleRemoveBook(book.id)}/>
        </div>
      </div>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  handleRemoveBook: PropTypes.func
}

export default Book
