import React from 'react'
import { FilterBooks } from '../Components/FilterBooks'
import { Container, Row } from 'react-bootstrap'
import { BookListContainer } from '../Components/BookListContainer'

export const BooksPage = () => (
  <Container>
    <FilterBooks />
    <Row>
      <BookListContainer />
    </Row>
  </Container>
)
