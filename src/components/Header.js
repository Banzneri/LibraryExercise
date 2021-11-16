import React from 'react'
import AddBookForm from './AddBookForm'
import PropTypes from 'prop-types'

const Header = ({ booksData }) => (
  <div className='flex-container' id='header'>
    <h1>Books</h1>
    <AddBookForm booksData={booksData} />
  </div>
)

Header.propTypes = {
  booksData: PropTypes.object
}

export default Header
