import React, { useEffect, useState } from 'react'
import { FilterBooks } from '../components/FilterBooks.js'
import { Container, Row } from 'react-bootstrap'
import { BookListContainer } from '../components/BookList/BookListContainer.js'
import { useBooks } from '../contexts/BooksContext'
import { getBooks, getBorrowsByCurrentUser } from '../LibraryService.js'

export const BooksPage = () => {
  const [books, setBooks] = useState([])
  const { setBorrows } = useBooks()

  useEffect(() => {
    const update = async () => {
      setBorrows(await getBorrowsByCurrentUser())
      setBooks(await getBooks())
    }
    update()
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
