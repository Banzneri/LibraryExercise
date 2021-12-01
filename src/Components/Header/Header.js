import React, { useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/AuthContext.js'
import { useBooks } from '../../contexts/BooksContext.js'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../constants'
import { Col, Container, Row, Navbar, Nav } from 'react-bootstrap'
import * as requests from '../../requests.js'
import PropTypes from 'prop-types'
import { useUser } from '../../contexts/UserContext.js'

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

  const AdminLink = () => role === 'ADMIN' && <Nav.Link onClick={() => navigate('/admin')}>Admin</Nav.Link>

  const styles = {
    header: {
      paddingTop: '3rem',
      paddingBottom: '2rem'
    },
    navBar: {
      margin: '0 auto'
    }
  }

  return (
    <Container>
      <Row style={styles.header}>
        <Col><h1>{headerText}</h1></Col>
        <Col>
          <Navbar style={styles.navBar} variant="dark" expand="lg">
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <AdminLink />
                  <Nav.Link onClick={() => navigate('/books')}>Books</Nav.Link>
                  <Nav.Link onClick={() => navigate('/borrows')}>Borrows</Nav.Link>
                  <Nav.Link onClick={logOut}>Log out</Nav.Link>
                </Nav>
              </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  )
}

Header.propTypes = {
  headerText: PropTypes.string,
  page: PropTypes.string
}
