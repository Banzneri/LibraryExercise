import React from 'react'
import AddBookForm from './AddBookForm'
import PropTypes from 'prop-types'

const Header = ({ handleAddBook }) => (
  <div className='flex-container' id='header'>
    <h1>Books</h1>
    <AddBookForm handleAddBook={handleAddBook}/>
  </div>
)

Header.propTypes = {
  handleAddBook: PropTypes.func
}

export default Header
