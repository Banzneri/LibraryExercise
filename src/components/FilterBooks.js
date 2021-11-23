/* eslint-disable camelcase */
import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { BASE_URL } from '../constants.js'

export const FilterBooks = ({ genres, setBooks }) => {
  const onFilterSubmit = (e) => {
    e.preventDefault()
    const genre_id = e.target[0].value

    axios
      .get(`${BASE_URL}/books/genres/${genre_id}`, { withCredentials: true })
      .then(e => {
        setBooks(e.data)
      })
  }

  const getAllBooks = () => {
    axios
      .get(`${BASE_URL}/books`, { withCredentials: true })
      .then(e => {
        setBooks(e.data)
      })
  }

  return (
    <div className='flex-container' id='filter-books'>
      <form onSubmit={e => onFilterSubmit(e)} id='filter-form'>
        <label htmlFor='filter-genre' />
        <select className='button' id="filter-genre" name="filter-genre">
          {genres.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
        </select>
        <input type='submit' className='button' value='Filter' />
      </form>
      <input type='button' className='button' onClick={getAllBooks} value='Get all books' />
    </div>
  )
}

FilterBooks.propTypes = {
  genres: PropTypes.array,
  setBooks: PropTypes.func
}
