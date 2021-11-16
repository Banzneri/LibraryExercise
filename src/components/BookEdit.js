import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as requests from '../requests.js'

const BookEdit = ({ book, booksData, setSelectedBook }) => {
  useEffect(() => {
    document.getElementById('edit-name').value = book.name
    document.getElementById('edit-year').value = book.release_year
    document.getElementById('edit-genre').value = book.genre_id
    document.getElementById('edit-language').value = book.language_id
    document.getElementById('edit-volume').value = booksData.volumes.filter(e => e.book_id === book.id).length
  }, [])

  const hide = () => {
    setSelectedBook(null)
  }

  const getQuantity = () => {
    return booksData.volumes.filter(e => e.book_id === book.id).length
  }

  const onSubmit = (e) => {
    e.preventDefault()
    book.name = e.target[0].value
    book.release_year = e.target[1].value
    book.genre_id = e.target[2].value
    book.language_id = e.target[3].value
    requests.editBook(book, booksData.setBooks)
    hide()
  }

  return (
    <div id='edit-book'>
      <form onSubmit={e => onSubmit(e)}>
        <h2>{book.name}</h2>
        <label htmlFor='edit-name'> Title: </label>
        <input type='text' id='edit-name' defaultValue={book.name} required/>
        <label htmlFor='edit-year'> Release year: </label>
        <input type='year' id='edit-year' defaultValue={book.release_year} required/>
        <label htmlFor='edit-genre'> Genre: </label>
        <select id="edit-genre" name="edit-genre" defaultValue={book.genre_id}>
          {booksData.genres.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        <label htmlFor='edit-language'> Language: </label>
        <select id="edit-language" name="edit-languages" defaultValue={book.language_id}>
          {booksData.languages.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        <label htmlFor='edit-volume'> Quantity: </label>
        <input type='text' id='edit-volume' defaultValue={getQuantity()} required/>
        <input className='button' type='submit' defaultValue='Edit book' />
      </form>
      <input id='close-edit' type='button' value='close' onClick={hide} />
    </div>
  )
}

BookEdit.propTypes = {
  book: PropTypes.object,
  booksData: PropTypes.object,
  setSelectedBook: PropTypes.func
}

export default BookEdit
