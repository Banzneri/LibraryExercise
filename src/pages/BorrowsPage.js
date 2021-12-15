import { Container, Row } from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import { BookListContainer } from '../components/BookList/BookListContainer.js'
import { useBooks } from '../contexts/BooksContext.js'
import { FilterBooks } from '../components/FilterBooks.js'
import { getBooksByVolumeIds } from '../LibraryService.js'

export const BorrowsPage = () => {
  const [books, setBooks] = useState([])

  const { borrows } = useBooks()

  useEffect(() => {
    const updateBooks = async () => {
      const books = await getBooksByVolumeIds(borrows.map(e => e.volume_id))
      setBooks(books)
    }
    updateBooks()
  }, [])

  return (
    <Container>
      <FilterBooks books={books} setBooks={setBooks} />
      <Row>
        {borrows.length > 0
          ? <BookListContainer page='borrows' books={books} setBooks={setBooks}/>
          : <h3>No borrows yet!</h3>}
      </Row>
    </Container>
  )
}
