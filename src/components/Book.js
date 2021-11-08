/* eslint-disable react/prop-types */
import React from 'react'

const Book = ({ book }) => {
  console.log(book)
  return (
      <div className='book-description'>
        <p><b>Name</b>: {book.name}</p>
        <p><b>Genre</b>: {book.genre}</p>
        <p><b>Year</b>: {book.release_year}</p>
        <p><b>Language</b>: {book.language}</p>
      </div>
  )
}

export default Book
