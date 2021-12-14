import React from 'react'
import PropTypes from 'prop-types'
import * as requests from '../requests.js'
import { useBooks } from '../contexts/BooksContext.js'
import { Container, Modal } from 'react-bootstrap'
import { EditBookForm } from './Forms/EditBookForm.js'

const EditBookModal = ({ book, show, handleClose }) => {
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
    modal: {
      color: 'black'
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
        <EditBookForm onSubmit={onSubmit} book={book} genres={genres} languages={languages} />
      </Container>
    </Modal>
  )
}

EditBookModal.propTypes = {
  book: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func
}

export default EditBookModal
