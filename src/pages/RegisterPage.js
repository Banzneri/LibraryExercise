import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { Errors } from '../components/Forms/FormComponents/Errors'
import { LoremIpsum } from '../components/LoremIpsum'
import { RegisterForm } from '../components/Forms/RegisterForm'
import { BASE_URL } from '../constants'

const RegisterPage = () => {
  const [errors, setErrors] = useState('')
  const navigate = useNavigate()

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      password2: e.target[3].value
    }

    axios
      .post(`${BASE_URL}/users/register`, user)
      .then(e => {
        navigate('/login')
      })
      .catch(error => {
        const messages = error.response.data
        setErrors(messages)
      })
  }

  const Title = () => <h2 style={{ marginBottom: '2rem' }}>Register</h2>

  return (
    <Container style={{ paddingTop: '5rem' }}>
      <Row>
        <Col md={4} style={{ marginBottom: '5rem' }}>
          <Title />
          <RegisterForm onSubmit={onSubmit} />
        </Col>
        <Col md={2} />
        <Col md={6}> <LoremIpsum /> </Col>
      </Row>
      <Errors errorMessages={errors} />
    </Container>
  )
}

export default RegisterPage
