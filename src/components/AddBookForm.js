import React from 'react'
import PropTypes from 'prop-types'

const AddBookForm = ({ handleAddBook, genres, languages }) => {
  return (
    <div id='add-book-form'>
      <form className='flex-container'>
        <span className='form-span'>
          <label htmlFor='add-name'> Title: </label>
          <input type='text' id='add-name'/>
        </span>
        <span className='form-span'>
          <label htmlFor='add-year'> Release year: </label>
          <input type='text' id='add-year'/>
        </span>
        <span className='form-span'>
        <label htmlFor='add-genres'> Language: </label>
        <select id="add-genre" name="add-genre">
          {genres.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        </span>
        <span className='form-span'>
          <label htmlFor='add-language'> Language: </label>
          <select id="add-language" name="add-language">
            {languages.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </span>
        <input className='button' type='button' value='Add book' onClick={handleAddBook}/>
      </form>
    </div>
  )
}

AddBookForm.propTypes = {
  handleAddBook: PropTypes.func,
  genres: PropTypes.array,
  languages: PropTypes.array
}

export default AddBookForm
