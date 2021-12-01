import React, { useEffect, useState } from 'react'
import { FilterBooks } from '../Components/FilterBooks'
import { Container, Row } from 'react-bootstrap'
import { BookListContainer } from '../Components/BookList/BookListContainer'
import { getBooks, getBorrowsByCurrentUser } from '../requests'
import { useBooks } from '../contexts/BooksContext'

export const BooksPage = () => {
  const [books, setBooks] = useState([])
  const { setBorrows } = useBooks()

  useEffect(() => {
    getBorrowsByCurrentUser()
      .then(e => setBorrows(e.data))
      .then(() => getBooks())
      .then(e => setBooks(e.data))
  }, [])

  return (
    <Container>
      <FilterBooks books={books} setBooks={setBooks} />
      <Row>
        <BookListContainer page='books' books={books} setBooks={setBooks} />
      </Row>
    </Container>
  )
}
