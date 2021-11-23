import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as requests from '../requests.js'
import { useBooks } from '../contexts/BooksContext.js'

const BookEdit = ({ book, setSelectedBook }) => {
  const { genres, languages, setBooks } = useBooks()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  const hide = () => {
    document.body.style.overflow = 'auto'
    setSelectedBook(null)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    book.name = e.target[0].value
    book.releaseYear = e.target[1].value
    book.genreId = e.target[2].value
    book.languageId = e.target[3].value
    requests.editBook(book, setBooks)
    hide()
  }

  return (
    <div id='edit-container'>
      <div id='edit-book'>
        <form onSubmit={e => onSubmit(e)}>
          <h2>{book.name}</h2>
          <label htmlFor='edit-name'> Title: </label>
          <input className='button' type='text' id='edit-name' defaultValue={book.name} required/>
          <label htmlFor='edit-year'> Release year: </label>
          <input className='button' type='year' id='edit-year' defaultValue={book.release_year} required/>
          <label htmlFor='edit-genre'> Genre: </label>
          <select className='button' id="edit-genre" name="edit-genre" defaultValue={book.genre_id}>
            {genres.map(e =>
              <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
          <label htmlFor='edit-language'> Language: </label>
          <select className='button' id="edit-language" name="edit-languages" defaultValue={book.language_id}>
            {languages.map(e =>
              <option key={e.id} value={e.id}>{e.name}</option>)}
          </select>
          {/* <label htmlFor='edit-volume'> Quantity: </label>
          <input type='text' id='edit-volume' defaultValue={getQuantity()} required/> */}
          <input className='button' type='submit' defaultValue='Edit book' />
        </form>
        <input id='close-edit' type='button' value='close' onClick={hide} />
      </div>
    </div>
  )
}

BookEdit.propTypes = {
  book: PropTypes.object,
  setSelectedBook: PropTypes.func
}

export default BookEdit
