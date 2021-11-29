import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CloseButton, Button, ListGroup, ListGroupItem, Badge } from 'react-bootstrap'
import { useBooks } from '../../contexts/BooksContext'
import axios from 'axios'
import { BASE_URL } from '../../constants'
import { useUser } from '../../contexts/UserContext'

const styles = {
  card: {
    margin: '1rem 0 1rem 0',
    background: '#d6d2d2',
    color: 'black',
    border: '0px'
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
    width: '100%',
    borderRadius: 0
  },
  footer: {
    padding: '0px'
  }
}

const BookCard = ({
  book,
  handleRemoveBook,
  handleViewBook,
  setBooks,
  volume,
  page
}) => {
  const [isBorrowed, setIsBorrowed] = useState(false)
  const [freeVolume, setFreeVolume] = useState(0)

  const { languages, genres, borrows } = useBooks()
  const { role } = useUser()
  const language = languages.find(e => e.id === book.language_id)
  const genre = genres.find(e => e.id === book.genre_id)

  useEffect(() => {
    axios
      .get(`${BASE_URL}/volumes/${book.id}`,
        { withCredentials: true })
      .then(e => {
        const volumeIds = e.data.map(e => e.id)
        const borrowIds = borrows.map(e => e.volume_id)
        setIsBorrowed(volumeIds.some(e => borrowIds.includes(e)))
      })
      .then(e => {
        return axios // get available volumes by book id
          .get(`${BASE_URL}/volumes/book/${book.id}`,
            { withCredentials: true })
      })
      .then(e => {
        setFreeVolume(e.data.length)
      })
  }, [])

  return (
    <Card style={styles.card}>
      <Card.Body>
        <Card.Title>
          {book?.name}{' '}
           {(isBorrowed || page === 'borrows') &&
          <Badge bg='success'>Borrowed</Badge>}
        </Card.Title>
        <Card.Img src="https://picsum.photos/200/300/" style={styles.cardImage} />
        <ListGroup className="list-group-flush">
          <ListGroupItem><b>Year</b> {book?.release_year}</ListGroupItem>
          <ListGroupItem><b>Genre</b> {genre?.name}</ListGroupItem>
          <ListGroupItem><b>Language</b> {language?.name}</ListGroupItem>
          <ListGroupItem><b>Quantity</b> {freeVolume}</ListGroupItem>
        </ListGroup>
      </Card.Body>
      {role === 'ADMIN' &&
        <CloseButton style={styles.closeButton} onClick={(e) => handleRemoveBook(e, book.id, setBooks)} />}
      <Card.Footer style={styles.footer}>
        <Button variant='success' style={styles.button} onClick={() => handleViewBook(book)}>
            View
        </Button>
      </Card.Footer>
    </Card>
  )
}

BookCard.propTypes = {
  book: PropTypes.object,
  handleRemoveBook: PropTypes.func,
  handleViewBook: PropTypes.func,
  setBooks: PropTypes.func,
  genre: PropTypes.object,
  language: PropTypes.object,
  volume: PropTypes.array,
  page: PropTypes.string
}

export default BookCard
