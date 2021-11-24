import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.js'
import { BASE_URL } from '../../constants.js'
import { Form, Button, Container, Col, Row } from 'react-bootstrap'
import { EmailInput } from './EmailInput.js'
import { PasswordInput } from './PassWordInput.js'

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const { setAuthed } = useAuth()

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: e.target[0].value,
      password: e.target[1].value
    }

    axios
      .post(`${BASE_URL}/users/login`, user, { withCredentials: true })
      .then(e => {
        setAuthed(true)
        navigate('/books')
      })
      .catch(e => {
        setErrorMessage('wrong username or password')
      })
  }

  const styles = {
    parent: {
      paddingTop: '3rem'
    }
  }

  return (
    <div style={styles.parent}>
      <h2>Login</h2>
      {errorMessage &&
        <span className='error-message'>
          <p className='line'>{errorMessage}</p>
        </span>}
      <Form onSubmit={(e) => onSubmit(e)}>
        <br />
        <Container>
          <Row>
            <Col md={4} style={{ marginBottom: '5rem' }}>
              <EmailInput />
              <PasswordInput />
              <div>
                <Button type="submit">Submit</Button>{' '}
                <Link to="/">
                  <Button>Register</Button>{' '}
                </Link>
              </div>
            </Col>
            <Col md={2} />
            <Col md={6}>
              <div style={{ textAlign: 'center' }}>
                <h1>Library</h1>
                <br/>
                <br/>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                  Lorem Ipsum has been the industry&apos;s standard dummy text ever since the 1500s,
                  when an unknown printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but also the leap into
                  electronic typesetting, remaining essentially unchanged. It was popularised in
                  the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                  and more recently with desktop publishing software like Aldus PageMaker including
                  versions of Lorem Ipsum.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </Form>
    </div>
  )
}

export default LoginForm
