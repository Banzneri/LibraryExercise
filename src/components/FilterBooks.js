/* eslint-disable camelcase */
import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

export const FilterBooks = ({ genres, setBooks }) => {
  const onFilterSubmit = (e) => {
    e.preventDefault()
    const genre_id = e.target[0].value

    axios
      .get(`http://localhost:3001/books/genres/${genre_id}`, { withCredentials: true })
      .then(e => {
        setBooks(e.data)
      })
  }

  const getAllBooks = () => {
    axios
      .get('http://localhost:3001/books', { withCredentials: true })
      .then(e => {
        setBooks(e.data)
      })
  }

  return (
    <div className='flex-container'>
      <input type='button' className='button' onClick={getAllBooks} value='Get all books'/>
      <form onSubmit={e => onFilterSubmit(e)}>
        <label htmlFor='filter-genre' />
        <select className='button' id="filter-genre" name="filter-genre">
          {genres.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        <input type='submit' className='button' value='Filter'/>
      </form>
    </div>
  )
}

FilterBooks.propTypes = {
  genres: PropTypes.array,
  setBooks: PropTypes.func
}
