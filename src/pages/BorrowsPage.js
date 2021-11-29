import { Container, Row } from 'react-bootstrap'
import React, { useEffect } from 'react'
import { BookListContainer } from '../Components/BookList/BookListContainer.js'
import { useBooks } from '../contexts/BooksContext.js'
import axios from 'axios'
import { BASE_URL } from '../constants.js'

export const BorrowsPage = () => {
  const { borrows, setBooks } = useBooks()

  useEffect(() => {
    axios.all(borrows.map(e =>
      axios.get(`${BASE_URL}/books/volumes/${e.volume_id}`,
        { withCredentials: true })))
      .then(axios.spread((...res) => {
        const books = res.map(e => e.data).flat()
        setBooks(books)
      }))

    return function cleanUp () {
      setBooks([])
    }
  }, [])

  return (
    <Container>
      <Row>
        {borrows.length > 0
          ? <BookListContainer page='borrows' />
          : <h3>No borrows yet!</h3>}
      </Row>
    </Container>
  )
}
