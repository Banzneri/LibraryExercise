import React, { useEffect, useState } from 'react'
import { FilterBooks } from '../components/FilterBooks'
import { Container, Row } from 'react-bootstrap'
import { BookListContainer } from '../components/BookList/BookListContainer'
import { useBooks } from '../contexts/BooksContext'
import { useAuth } from '../contexts/AuthContext'

export const BooksPage = () => {
  const [books, setBooks] = useState([])
  const { setBorrows } = useBooks()
  const { authAxios } = useAuth()

  useEffect(() => {
    const update = async () => {
      const borrows = await authAxios.get('/user/borrows')
      const books = await authAxios.get('/books')
      setBorrows(borrows.data)
      setBooks(books.data)
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
