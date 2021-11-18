import React from 'react'
import * as requests from '../requests.js'
import PropTypes from 'prop-types'

const AddBookForm = ({ genres, languages, setBooks }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const releaseYear = e.target[1].value
    const genreId = e.target[2].value
    const languageId = e.target[3].value

    const book = {
      name,
      releaseYear,
      genreId,
      languageId
    }

    requests.addBook(book, setBooks)
  }

  return (
    <div id='add-book-form'>
      <form onSubmit={e => onSubmit(e)} className='flex-container'>
        <span className='form-span'>
          <label htmlFor='add-name'>Title:</label>
          <input className='button' type='text' id='add-name' name='name' required />
        </span>
        <span className='form-span'>
          <label htmlFor='add-year'>Release year:</label>
          <input className='button' type='year' id='add-year' maxLength='4' pattern='\d{4}' required />
        </span>
        <span className='form-span'>
          <label htmlFor='add-genres'>Genre:</label>
          <select className='button' id="add-genre" name="genre_id">
            {genres.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </span>
        <span className='form-span'>
          <label htmlFor='add-language'>Language:</label>
          <select className='button' id="add-language" name="language_id">
            {languages.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </span>
        <input id='submit-book' className='button' type='submit' value='Add book' />
      </form>
    </div>
  )
}

AddBookForm.propTypes = {
  genres: PropTypes.array,
  languages: PropTypes.array,
  setBooks: PropTypes.func
}

export default AddBookForm
