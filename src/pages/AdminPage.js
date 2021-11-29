import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { BookListContainer } from '../Components/BookList/BookListContainer'
import AddBookForm from '../Components/Forms/AddBookForm'

export const AdminPage = () => (
  <Container>
    <AddBookForm />
    <Row>
      <BookListContainer page='admin'/>
    </Row>
  </Container>
)
