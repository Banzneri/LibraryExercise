import React from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants'
import { Col, Container, Row, Button } from 'react-bootstrap'

export const Header = () => {
  const { setAuthed } = useAuth()
  const navigate = useNavigate()

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
            <Button variant='secondary' onClick={logOut}>Log out</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
