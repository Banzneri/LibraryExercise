import React from 'react'
import * as requests from '../requests.js'
import PropTypes from 'prop-types'

const AddBookForm = ({ booksData }) => {
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

    requests.addBook(book, booksData.setBooks)
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
          <input className='button' type='text' id='add-year' name='release_year' required />
        </span>
        <span className='form-span'>
        <label htmlFor='add-genres'>Genre:</label>
        <select className='button' id="add-genre" name="genre_id">
          {booksData.genres.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        </span>
        <span className='form-span'>
          <label htmlFor='add-language'>Language:</label>
          <select className='button' id="add-language" name="language_id">
            {booksData.languages.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
        </span>
        <input className='button' type='submit' value='Add book' />
      </form>
    </div>
  )
}

AddBookForm.propTypes = {
  booksData: PropTypes.object
}

export default AddBookForm
