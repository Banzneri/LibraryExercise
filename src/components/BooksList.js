import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BooksList = ({ books, handleRemoveBook }) => {
  return (
    <div className='grid-container' id='books-list'>
      {books.map(b => <Book book = {b} key = {b.id} handleRemoveBook={handleRemoveBook}/>)}
    </div>
  )
}

BooksList.propTypes = {
  books: PropTypes.array,
  handleRemoveBook: PropTypes.object
}

export default BooksList
