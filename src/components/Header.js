import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext.js'
import { useBooks } from '../contexts/BooksContext.js'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants'
import { Col, Container, Row, Button } from 'react-bootstrap'
import * as requests from '../requests.js'

export const Header = () => {
  const { setAuthed } = useAuth()
  const { setBooks, borrows, setBorrows } = useBooks()
  const navigate = useNavigate()

  useEffect(() => {
    requests.getBorrowsByCurrentUser(setBorrows)
  }, [])

  const logOut = () => {
    axios
      .get(`${BASE_URL}/users/logout`, { withCredentials: true })
      .then(e => {
        setAuthed(false)
        navigate('/login')
        console.log(e)
      })
  }

  const admin = () => {
    navigate('/admin')
  }

  const getBorrowedBooks = () => {
    axios.all(borrows.map(e => axios.get(`${BASE_URL}/books/volumes/${e.volume_id}`, { withCredentials: true })))
      .then(axios.spread((...res) => {
        const books = res.map(e => e.data).flat()
        console.log(books)
        setBooks(books)
      }))
  }

  // eslint-disable-next-line no-unused-vars
  const styles = {
    header: {
      paddingTop: '3rem',
      paddingBottom: '2rem'
      // background: '#1e3d59'
    },
    buttons: {
      float: 'right'
    }
  }

  return (
    <Container>
      <Row style={styles.header}>
        <Col><h1>Books</h1></Col>
        <Col>
          <div style={styles.buttons}>
            <Button variant='primary' onClick={admin}>Admin</Button>{' '}
            <Button variant='secondary' onClick={getBorrowedBooks}>My Borrows</Button>{' '}
            <Button variant='secondary' onClick={logOut}>Log out</Button>{' '}
          </div>
        </Col>
      </Row>
    </Container>
  )
}
