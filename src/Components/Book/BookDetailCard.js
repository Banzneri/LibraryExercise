import React, { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { ListGroup, ListGroupItem, Button, Card } from 'react-bootstrap'
import { useBooks } from '../../contexts/BooksContext'
import { BASE_URL } from '../../constants'
import { getBooks } from '../../requests'

export const BookDetailCard = ({ book }) => {
  const [message, setMessage] = useState(' ')
  const { genres, languages, setBorrows, setBooks } = useBooks()
  const genre = genres?.find(e => e.id === book?.genre_id)
  const language = languages?.find(e => e.id === book?.language_id)

  const onClick = () => {
    axios // get available volumes by book id
      .get(`${BASE_URL}/volumes/book/${book.id}`,
        { withCredentials: true })
      .then(e => { // then add an available volume to borrows for the user
        console.log(e.data)
        const volumeId = Array.isArray(e.data) ? e.data[0].id : e.data.id
        return axios.post(`${BASE_URL}/user/borrows/volume`,
          { volumeId: volumeId },
          { withCredentials: true })
      })
      .then(e => { // then get updated borrows
        return axios.get(`${BASE_URL}/user/borrows`,
          { withCredentials: true })
      })
      .then(e => { // and then set a message
        getBooks(setBooks)
        setMessage('Borrow successful')
        setBorrows(e.data)
      })
      .catch(e => {
        setMessage('Can\'t loan')
      })
  }

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

  return (
    <Card style={styles.card}>
      <Card.Body>
        <Card.Img src="https://picsum.photos/200/300/" style={styles.cardImage} />
        <ListGroup>
          <ListGroupItem>Name: {book?.name}</ListGroupItem>
          <ListGroupItem>Year: {book?.release_year}</ListGroupItem>
          <ListGroupItem>Genre: {genre?.name}</ListGroupItem>
          <ListGroupItem>Language: {language?.name}</ListGroupItem>
        </ListGroup>
      </Card.Body>
      <Card.Footer style={styles.footer}>
        <Button style={styles.button} onClick={onClick}>Borrow</Button>
        {message || '|'}
      </Card.Footer>
    </Card>
  )
}

BookDetailCard.propTypes = {
  book: PropTypes.object,
  genres: PropTypes.array,
  languages: PropTypes.array
}
