import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { BASE_URL } from '../constants.js'
import { Errors } from '../Components/Forms/FormComponents/Errors.js'
import { LoremIpsum } from '../Components/LoremIpsum.js'
import { Col, Container, Row } from 'react-bootstrap'
import { LoginForm } from '../Components/Forms/LoginForm.js'

const LoginPage = () => {
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
      .post(`${BASE_URL}/users/login`, user,
        { withCredentials: true })
      .then(e => {
        setAuthed(true)
        navigate('/books')
      })
      .catch(e => {
        setErrorMessage('Wrong username or password')
      })
  }

  const Title = () => <h2 style={{ marginBottom: '2rem' }}>Log in</h2>

  return (
    <Container style={{ marginTop: '5rem' }}>
      <Row>
        <Col md={4} style={{ marginBottom: '5rem' }}>
          <Title />
          <LoginForm onSubmit={onSubmit}/>
        </Col>
        <Col md={2} />
        <Col md={6}> <LoremIpsum /> </Col>
      </Row>
      <Errors errorMessages={errorMessage}/>
    </Container>
  )
}

export default LoginPage
