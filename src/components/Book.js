import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book, handleRemoveBook }) => {
  return (
    <div className='book'>
      <div className='bood-info'>
        <p><b>Name</b>: {book.name}</p>
        <p><b>Genre</b>: {book.genre}</p>
        <p><b>Year</b>: {book.release_year}</p>
        <p><b>Language</b>: {book.language}</p>
      </div>
      <div className='book-buttons'>
        <input className='remove-book' type='button' value='remove' onClick={() => handleRemoveBook(book.id)}/>
        <input id='edit book'type='button' value='edit' onClick={() => handleRemoveBook(book.id)}/>
      </div>
    </div>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  handleRemoveBook: PropTypes.func
}

export default Book
