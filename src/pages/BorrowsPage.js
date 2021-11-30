import { Container, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { BookListContainer } from '../Components/BookList/BookListContainer.js'
import { useBooks } from '../contexts/BooksContext.js'
import axios from 'axios'
import { BASE_URL } from '../constants.js'

export const BorrowsPage = () => {
  const [books, setBooks] = useState([])
  const { borrows } = useBooks()

  useEffect(() => {
    axios.all(borrows.map(e =>
      axios.get(`${BASE_URL}/books/volumes/${e.volume_id}`,
        { withCredentials: true })))
      .then(axios.spread((...res) => {
        const books = res.map(e => e.data).flat()
        setBooks(books)
      }))
  }, [])

  return (
    <Container>
      <Row>
        {borrows.length > 0
          ? <BookListContainer page='borrows' books={books} setBooks={setBooks}/>
          : <h3>No borrows yet!</h3>}
      </Row>
    </Container>
  )
}
