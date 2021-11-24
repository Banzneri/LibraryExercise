import React from 'react'
import PropTypes from 'prop-types'
import { Card, CloseButton, Button, ListGroup, ListGroupItem } from 'react-bootstrap'

const styles = {
  card: {
    margin: '1rem 0 1rem 0',
    background: '#3a3841'
  },
  cardImage: {
    objectFit: 'cover',
    height: '15rem'
  },
  closeButton: {
    top: 0,
    right: 0,
    position: 'absolute'
  },
  button: {
    width: '100%'
  }
}

const Book = ({ book, handleRemoveBook, handleViewBook, setBooks, genre, language, volume }) => {
  return (
    <Card style={styles.card}>
      <Card.Body>
        <Card.Title>{book?.name}</Card.Title>
        <Card.Img src="https://picsum.photos/200/300/" style={styles.cardImage}/>
        <ListGroup className="list-group-flush">
          <ListGroupItem><b>Year</b> {book?.release_year}</ListGroupItem>
          <ListGroupItem><b>Genre</b> {genre?.name}</ListGroupItem>
          <ListGroupItem><b>Language</b> {language?.name}</ListGroupItem>
          <ListGroupItem><b>Quantity</b> {volume?.length}</ListGroupItem>
        </ListGroup>
      </Card.Body>
      <CloseButton style={styles.closeButton} onClick={(e) => handleRemoveBook(e, book.id, setBooks)}></CloseButton>
      <Card.Footer>
        <Button variant='success' style={styles.button} onClick={() => handleViewBook(book)}>View</Button>
      </Card.Footer>
    </Card>
  )
}

Book.propTypes = {
  book: PropTypes.object,
  handleRemoveBook: PropTypes.func,
  handleViewBook: PropTypes.func,
  setBooks: PropTypes.func,
  genre: PropTypes.object,
  language: PropTypes.object,
  volume: PropTypes.array
}

export default Book
