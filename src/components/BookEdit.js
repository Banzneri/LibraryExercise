import React from 'react'
import PropTypes from 'prop-types'
import * as requests from '../requests.js'
import { useBooks } from '../contexts/BooksContext.js'
import { Form, Button, Modal, Container } from 'react-bootstrap'

const BookEdit = ({ book, show, handleClose }) => {
  const { genres, languages, setBooks } = useBooks()

  const onSubmit = (e) => {
    e.preventDefault()
    book.name = e.target[0].value
    book.releaseYear = e.target[1].value
    book.genreId = e.target[2].value
    book.languageId = e.target[3].value
    requests.editBook(book, setBooks)
    handleClose()
  }

  const styles = {
    form: {
      paddingBottom: '1rem'
    },
    modal: {
      color: 'black'
    },
    modalInner: {
      background: 'grey'
    }
  }

  return (
    <Modal
      style={styles.modal}
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <h2>Edit book</h2>
      </Modal.Header>
      <Container>
        <Form onSubmit={onSubmit} style={styles.form}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" defaultValue={book?.name} />
            <Form.Text className="text-muted">
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="releaseYear">
            <Form.Label>Released</Form.Label>
            <Form.Control type="year" defaultValue={book?.release_year} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="genre">
            <Form.Label>Genre</Form.Label>
            <Form.Select aria-label="Genre" defaultValue={book?.genre_id}>
              {genres.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="genre">
            <Form.Label>Language</Form.Label>
            <Form.Select aria-label="Genre" defaultValue={book?.language_id}>
              {languages.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    </Modal>
  )
}

BookEdit.propTypes = {
  book: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func
}

export default BookEdit
