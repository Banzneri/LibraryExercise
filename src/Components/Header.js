import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext.js'
import { useBooks } from '../contexts/BooksContext.js'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants'
import { Col, Container, Row, Button } from 'react-bootstrap'
import * as requests from '../requests.js'
import PropTypes from 'prop-types'
import { useUser } from '../contexts/UserContext.js'

export const Header = ({ headerText, page }) => {
  const { setAuthed } = useAuth()
  const { setBorrows } = useBooks()
  const { role } = useUser()
  const navigate = useNavigate()

  useEffect(() => {
    requests.getBorrowsByCurrentUser(setBorrows)
  }, [])

  const logOut = () => {
    axios
      .get(`${BASE_URL}/users/logout`,
        { withCredentials: true })
      .then(e => {
        setAuthed(false)
        navigate('/login')
      })
  }

  const adminPage = () => {
    navigate('/admin')
  }

  const booksPage = () => {
    navigate('/books')
  }

  const borrowsPage = () => {
    navigate('/borrows')
  }

  const styles = {
    header: {
      paddingTop: '3rem',
      paddingBottom: '2rem'
    },
    buttons: {
      float: 'right'
    }
  }

  const getVariant = (p) => {
    if (p === page) return 'primary'
    return 'secondary'
  }

  return (
    <Container>
      <Row style={styles.header}>
        <Col><h1>{headerText}</h1></Col>
        <Col>
          <div style={styles.buttons}>
            {role === 'ADMIN' && <Button variant={getVariant('admin')} onClick={adminPage}>Admin</Button>}{' '}
            <Button variant={getVariant('books')} onClick={booksPage}>Books</Button>{' '}
            <Button variant={getVariant('borrows')} onClick={borrowsPage}>My Borrows</Button>{' '}
            <Button variant={getVariant('logout')} onClick={logOut}>Log out</Button>{' '}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

Header.propTypes = {
  headerText: PropTypes.string,
  page: PropTypes.string
}
