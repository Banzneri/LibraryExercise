import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Card, CloseButton, Button, ListGroup, ListGroupItem, Badge, Alert } from 'react-bootstrap'
import { useBooks } from '../../contexts/BooksContext'
import { useUser } from '../../contexts/UserContext'
import {
  addVolumeByBookId,
  returnBorrowedBook,
  deleteVolumeById,
  getAllVolumesByBook,
  getAvailableVolumesByBook,
  borrowBook,
  getBorrowsByCurrentUser,
  getBooksByVolumeIds
} from '../../LibraryService'

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
  const [freeVolume, setFreeVolume] = useState(0)
  const [message, setMessage] = useState('')
  const [numberOfVolumesBorrowed, setNumberOfVolumesBorrowed] = useState(0)

  const { languages, genres, borrows, setBorrows } = useBooks()
  const { role } = useUser()

  const language = languages.find(e => e.id === book.language_id)
  const genre = genres.find(e => e.id === book.genre_id)

  let messageAlert

  const resetMessage = () => {
    clearTimeout(messageAlert)
    messageAlert = setTimeout(() => setMessage(''), 1000)
  }

  useEffect(() => {
    const update = async () => {
      const volumes = await getAllVolumesByBook(book)
      const volumeIds = volumes.map(e => e.id)
      const borrowIds = borrows.map(e => e.volume_id)
      const borrowedVolumes = volumeIds.filter(e => borrowIds.includes(e))
      setNumberOfVolumesBorrowed(borrowedVolumes.length)
      const availableVolumes = await getAvailableVolumesByBook(book)
      setFreeVolume(availableVolumes.length)
      resetMessage()
    }
    update()
  }, [])

  useEffect(() => {
    console.log('message effect')
    resetMessage()
  }, [message])

  const borrow = () => {
    const doBorrowOperaration = async () => {
      const borrowedBook = await borrowBook(book)
      console.log(borrowedBook)
      if (borrowedBook.length === 0) {
        throw new Error('No available volumes')
      }

      setBorrows(await getBorrowsByCurrentUser())
      setNumberOfVolumesBorrowed(numberOfVolumesBorrowed + 1)
      setMessage('Borrow successful')
      setFreeVolume(freeVolume - 1)
    }

    doBorrowOperaration().catch(e => setMessage(e.message))
  }

  const addVolume = async () => {
    await addVolumeByBookId(book.id)
    setFreeVolume(freeVolume + 1)
  }

  const deleteVolume = async () => {
    const availableVolumes = await getAvailableVolumesByBook(book)

    if (availableVolumes.length === 0) {
      setMessage('Nothing to delete')
      return
    }

    await deleteVolumeById(availableVolumes[0].id)
    setFreeVolume(freeVolume - 1)
  }

  const returnBook = async () => {
    await returnBorrowedBook(book.volume_id)

    const currentBorrows = await getBorrowsByCurrentUser()
    setBorrows(currentBorrows)
    setNumberOfVolumesBorrowed(numberOfVolumesBorrowed - 1)

    const borrowedBooks = await getBooksByVolumeIds(currentBorrows.map(b => b.volume_id))
    setBooks(borrowedBooks)
  }

  const alertVariant = message === 'No available volumes' ? 'danger' : 'success'
  const showNumberOfVolumes = page === 'books' && numberOfVolumesBorrowed > 1

  const ReturnBookButton = () =>
    <Button style={styles.button} onClick={returnBook}>Return book</Button>

  const BorrowButton = () =>
    <Button variant='success' style={styles.button} onClick={borrow}>
      Borrow
    </Button>

  const Message = () => message
    ? <Alert style={styles.alert} variant={alertVariant}>{message}</Alert>
    : null

  const BorrowedBadge = () => (numberOfVolumesBorrowed > 0 || page === 'borrows') &&
    <Badge style={styles.badge} bg='success'>
      Borrowed {showNumberOfVolumes ? `x ${numberOfVolumesBorrowed}` : ''}
    </Badge>

  const AdminDeleteButton = () => role === 'ADMIN' &&
    <CloseButton style={styles.closeButton} onClick={(e) => handleRemoveBook(e, book.id, setBooks)} />

  const AdminAddVolumeButton = () => role === 'ADMIN' &&
    <Button size="sm" onClick={addVolume}>Add</Button>

  const AdminDeleteVolumeButton = () => role === 'ADMIN' &&
    <Button size="sm" variant='danger' onClick={deleteVolume}>Delete</Button>

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
          {page === 'books' &&
            <ListGroupItem>
              <b>Available</b> {freeVolume} <AdminAddVolumeButton /> <AdminDeleteVolumeButton />
            </ListGroupItem>}
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
