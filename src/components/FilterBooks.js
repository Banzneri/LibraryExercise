/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import { useBooks } from '../contexts/BooksContext.js'
import { Container, Form } from 'react-bootstrap'
import { getBooks, getBooksByGenreId } from '../LibraryService.js'

export const FilterBooks = ({ setBooks }) => {
  const { genres } = useBooks()

  const onFilterChange = (e) => {
    const getAllBooks = async () => {
      setBooks(await getBooks())
    }

    const filterBooks = async (genre_id) => {
      setBooks(await getBooksByGenreId(genre_id))
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
            <option value="null">All</option>
            {genres.map(e =>
              <option key={e.id} value={e.id}>{e.name}</option>)}
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
