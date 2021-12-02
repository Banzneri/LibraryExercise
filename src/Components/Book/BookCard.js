import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CloseButton, Button, ListGroup, ListGroupItem, Badge, Alert } from 'react-bootstrap'
import { useBooks } from '../../contexts/BooksContext'
import { useUser } from '../../contexts/UserContext'
import {
  getAllVolumesByBookId,
  getAvailableVolumesByBookId,
  getBorrowsByCurrentUser,
  addVolumeByBookId,
  returnBorrow,
  getBooksByVolumeIds,
  borrowBookByBookId
} from '../../requests'
import axios from 'axios'

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
  },
  alert: {
    position: 'absolute',
    zIndex: 999,
    width: '100%',
    border: '1px black solid'
  },
  badge: {
    padding: '0.1rem 0.2rem 0.1rem 0.2rem'
  }
}

const BookCard = ({ book, handleRemoveBook, page, setBooks }) => {
  const [isBorrowed, setIsBorrowed] = useState(false)
  const [freeVolume, setFreeVolume] = useState(0)
  const [message, setMessage] = useState('')
  const [numberOfVolumesBorrowed, setNumberOfVolumesBorrowed] = useState(0)

  const { languages, genres, borrows, setBorrows } = useBooks()
  const { role } = useUser()

  const language = languages.find(e => e.id === book.language_id)
  const genre = genres.find(e => e.id === book.genre_id)

  let messageAlert

  useEffect(() => {
    // Update current available volumes
    // and check if the current user has
    // already borrowed a volume of the book
    getAllVolumesByBookId(book.id)
      .then(allVolumes => {
        const volumeIds = allVolumes.data.map(e => e.id)
        const borrowedVolumeIds = borrows.map(e => e.volume_id)
        const borrowedVolumes = volumeIds.filter(e => borrowedVolumeIds.includes(e))
        console.log(borrowedVolumes.length)
        setIsBorrowed(borrowedVolumes.length > 0)
      })
      .then(e => getAvailableVolumesByBookId(book.id))
      .then(e => setFreeVolume(e.data.length))
  }, [numberOfVolumesBorrowed])

  const borrow = () => {
    borrowBookByBookId(book.id)
      .then(e => {
        if (e.data.length === 0) {
          throw new Error('No available volumes')
        }
        return getBorrowsByCurrentUser()
      })
      .then(e => { // and then set borrows and message
        setBorrows(e.data)
        setNumberOfVolumesBorrowed(numberOfVolumesBorrowed + 1)
        clearTimeout(messageAlert)
        setMessage('Borrow successful')
        messageAlert = setTimeout(() => setMessage(''), 2000)
      })
      .catch(e => {
        clearTimeout(messageAlert)
        setMessage('Not available')
        messageAlert = setTimeout(() => setMessage(''), 2000)
      })
  }

  const addVolume = () => {
    addVolumeByBookId(book.id)
      .then(e => {
        setFreeVolume(freeVolume + 1)
      })
  }

  const returnBook = () => {
    returnBorrow(book.volume_id)
      .then(e => getBorrowsByCurrentUser())
      .then(e => {
        const myBorrows = e.data
        setBorrows(myBorrows)
        return getBooksByVolumeIds(myBorrows.map(b => b.volume_id))
      })
      .then(axios.spread((...res) => {
        const books = res.map(e => e.data).flat()
        setBooks(books)
      }))
  }

  const alertVariant = message === 'Not available' ? 'danger' : 'success'

  const ReturnBookButton = () =>
    <Button style={styles.button} onClick={returnBook}>Return book</Button>

  const BorrowButton = () =>
    <Button variant='success' style={styles.button} onClick={borrow}>
      Borrow
    </Button>

  const Message = () => message
    ? <Alert style={styles.alert} variant={alertVariant}>{message}</Alert>
    : null

  const BorrowedBadge = () => (isBorrowed || page === 'borrows') &&
    <Badge style={styles.badge} bg='success'>
      Borrowed
    </Badge>

  const AdminDeleteButton = () => role === 'ADMIN' &&
    <CloseButton style={styles.closeButton} onClick={(e) => handleRemoveBook(e, book.id, setBooks)} />

  const AdminAddVolumeButton = () => role === 'ADMIN' &&
    <Button size="sm" onClick={addVolume}>Add volume</Button>

  return (
    <Card style={styles.card}>
      <Card.Body>
        <Card.Title>
          {book?.name} <BorrowedBadge />
        </Card.Title>
        <Card.Img src="https://picsum.photos/200/300/" style={styles.cardImage} />
        <ListGroup className="list-group-flush">
          <ListGroupItem><b>Year</b> {book?.release_year}</ListGroupItem>
          <ListGroupItem><b>Genre</b> {genre?.name}</ListGroupItem>
          <ListGroupItem><b>Language</b> {language?.name}</ListGroupItem>
          <ListGroupItem>
            <b>Quantity</b> {freeVolume} <AdminAddVolumeButton />
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
      <AdminDeleteButton />
      <Card.Footer style={styles.footer}>
        {page === 'borrows' ? <ReturnBookButton /> : <BorrowButton />}
        <Message />
      </Card.Footer>
    </Card>
  )
}

BookCard.propTypes = {
  book: PropTypes.object,
  handleRemoveBook: PropTypes.func,
  page: PropTypes.string,
  setBooks: PropTypes.func
}

export default BookCard
