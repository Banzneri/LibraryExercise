import React from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { BookDetailCard } from './BookDetailCard.js'

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
      <Modal.Header closeButton><h3>{book?.name}</h3></Modal.Header>
      <BookDetailCard book={book} />
      <br/>
      <br/>
    </Modal>
  )
}

BookDetailsModal.propTypes = {
  book: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func
}
