import React, { useEffect, useState } from 'react'
import { FilterBooks } from '../Components/FilterBooks'
import { Container, Row } from 'react-bootstrap'
import { BookListContainer } from '../Components/BookList/BookListContainer'
import { updateBooks } from '../requests'

export const BooksPage = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    updateBooks(setBooks)
  }, [])

  return (
    <Container>
      <FilterBooks />
      <Row>
        <BookListContainer page='books' books={books} setBooks={setBooks} />
      </Row>
    </Container>
  )
}
