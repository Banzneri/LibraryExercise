import React, { useEffect } from 'react'
import { FilterBooks } from '../Components/FilterBooks'
import { Container, Row } from 'react-bootstrap'
import { BookListContainer } from '../Components/BookList/BookListContainer'
import { updateBooks } from '../requests'
import { useBooks } from '../contexts/BooksContext'

export const BooksPage = () => {
  const { setBooks } = useBooks()

  useEffect(() => {
    updateBooks(setBooks)

    return function cleanUp () {
      setBooks([])
    }
  }, [])

  return (
    <Container>
      <FilterBooks />
      <Row>
        <BookListContainer page='books'/>
      </Row>
    </Container>
  )
}
