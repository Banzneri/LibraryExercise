import React from 'react'
import AddBookForm from './AddBookForm'
import PropTypes from 'prop-types'

const Header = ({ handleAddBook, genres, languages }) => (
  <div className='flex-container' id='header'>
    <h1>Books</h1>
    <AddBookForm handleAddBook={handleAddBook} genres={genres} languages={languages}/>
  </div>
)

Header.propTypes = {
  handleAddBook: PropTypes.func,
  genres: PropTypes.array,
  languages: PropTypes.array
}

export default Header
