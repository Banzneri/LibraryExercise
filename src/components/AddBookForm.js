import React from 'react'
import PropTypes from 'prop-types'

const AddBookForm = ({ handleAddBook }) => {
  return (
      <div id='add-book-form'>
        <form>
          <label htmlFor='form-name'> Title: </label>
          <input type='text' id='form-name'/>
          <label htmlFor='form-year'> Release year: </label>
          <input type='text' id='form-year'/>
          <label htmlFor='form-genre'> Genre: </label>
          <input type='text' id='form-genre'/>
          <label htmlFor='form-language'> Language: </label>
          <input type='text' id='form-language'/>
          <input className='button' type='button' value='Add book' onClick={handleAddBook}/>
        </form>
      </div>
  )
}

AddBookForm.propTypes = {
  handleAddBook: PropTypes.func
}

export default AddBookForm
