import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext.js'
import { BASE_URL } from '../../constants.js'
import { Form, Container, Col, Row } from 'react-bootstrap'
import { EmailInput } from './EmailInput.js'
import { PasswordInput } from './PasswordInput.js'
import { SubmitLinkPair } from './SubmitLinkPair.js'
import { Errors } from './Errors.js'
import { LoremIpsum } from '../LoremIpsum.js'

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

  const Title = () => <h2 style={{ paddingBottom: '2rem' }}>Login</h2>

  return (
    <div>
      <Form onSubmit={(e) => onSubmit(e)}>
        <Container style={{ marginTop: '5rem' }}>
          <Row>
            <Col md={4} style={{ marginBottom: '5rem' }}>
              <Title />
              <EmailInput />
              <PasswordInput />
              <SubmitLinkPair url='/' linkText='Register' submitText='Log in' />
            </Col>
            <Col md={2} />
            <Col md={6}> <LoremIpsum /> </Col>
          </Row>
        </Container>
        <Errors errorMessages={errorMessage}/>
      </Form>
    </div>
  )
}

export default LoginForm
