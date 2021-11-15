import React from 'react'
import PropTypes from 'prop-types'

const BookEdit = ({ handleEditBook, book, genres, languages, volumes }) => {
  const hide = () => {
    document.getElementById('edit-book').style.display = 'none'
  }

  const getQuantity = () => volumes.filter(e => e.book_id === book.id).length

  return (
    <div id='edit-book'>
      <h2>{book.name}</h2>
      <label htmlFor='edit-name'> Title: </label>
      <input type='text' id='edit-name' defaultValue={book.name} />
      <label htmlFor='edit-year'> Release year: </label>
      <input type='year' id='edit-year' defaultValue={book.release_year} />
      <label htmlFor='edit-genre'> Genre: </label>
      <select id="edit-genre" name="edit-genre" defaultValue={book.genre_id}>
        {genres.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
      <label htmlFor='edit-language'> Language: </label>
      <select id="edit-language" name="edit-languages" defaultValue={book.language_id}>
        {languages.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
      </select>
      <label htmlFor='edit-volume'> Quantity: </label>
      <input type='text' id='edit-volume' defaultValue={getQuantity()} />
      <input className='button' type='button' defaultValue='Edit book' onClick={(() => handleEditBook(book))} />
      <input id='close-edit' type='button' value='close' onClick={hide} />
    </div>
  )
}

BookEdit.propTypes = {
  handleEditBook: PropTypes.func,
  book: PropTypes.object,
  genres: PropTypes.array,
  languages: PropTypes.array,
  volumes: PropTypes.array
}

export default BookEdit
