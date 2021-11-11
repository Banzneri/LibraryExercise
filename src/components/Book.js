import React from 'react'
import PropTypes from 'prop-types'

const Book = ({ book }) => {
  return (
      <div className='book-description'>
        <p><b>Name</b>: {book.name}</p>
        <p><b>Genre</b>: {book.genre}</p>
        <p><b>Year</b>: {book.release_year}</p>
        <p><b>Language</b>: {book.language}</p>
      </div>
  )
}

Book.propTypes = {
  book: PropTypes.object
}

export default Book
