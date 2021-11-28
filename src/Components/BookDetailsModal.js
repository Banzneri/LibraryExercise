import React from 'react'
import { Container, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { BookDetails } from './BookDetailCard'

export const BookDetailsModal = ({ book, show, handleClose }) => {
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
        <h2>Book details</h2>
      </Modal.Header>
      <Container>
        <BookDetails book={book}/>
        <br/>
      </Container>
      <br/>
    </Modal>
  )
}

BookDetailsModal.propTypes = {
  book: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func
}
