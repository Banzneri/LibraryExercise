/* eslint-disable camelcase */
import React from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { BASE_URL } from '../constants.js'
import { useBooks } from '../contexts/BooksContext.js'
import { Container, Form } from 'react-bootstrap'

export const FilterBooks = () => {
  const { genres, setBooks } = useBooks()

  const onFilterChange = (e) => {
    const getAllBooks = () => {
      axios
        .get(`${BASE_URL}/books`, { withCredentials: true })
        .then(e => {
          setBooks(e.data)
        })
    }

    const filterBooks = (genre_id) => {
      axios
        .get(`${BASE_URL}/books/genres/${genre_id}`, { withCredentials: true })
        .then(e => {
          setBooks(e.data)
        })
    }

    e.preventDefault()
    const genre_id = e.target.value

    genre_id !== 'null' ? filterBooks(genre_id) : getAllBooks()
  }

  return (
    <Container>
      <Form>
        <Form.Group className="mb-3" controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Select aria-label="Genre" onChange={(e) => onFilterChange(e)}>
            <option value='null'>All</option>
            {genres.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
          </Form.Select>
        </Form.Group>
      </Form>
    </Container>
  )
}

FilterBooks.propTypes = {
  genres: PropTypes.array,
  setBooks: PropTypes.func
}
