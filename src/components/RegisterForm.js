import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { EmailInput } from './Forms/EmailInput'
import { PasswordInput } from './Forms/PasswordInput'
import { SubmitLinkPair } from './Forms/SubmitLinkPair'
import { Errors } from './Forms/Errors'
import { TextForm } from './Forms/TextForm'
import { LoremIpsum } from './LoremIpsum'

const RegisterForm = () => {
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
      .post('http://localhost:3001/users/register', user)
      .then(e => {
        navigate('/login')
      })
      .catch(error => {
        console.log(error)
        const messages = error.response.data
        setErrors(messages)
      })
  }

  const Title = () => <h2 style={{ marginBottom: '2rem' }}>Register</h2>

  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      <Container style={{ paddingTop: '5rem' }}>
        <Row>
          <Col md={4} style={{ marginBottom: '5rem' }}>
            <Title />
            <TextForm text='Name' />
            <EmailInput />
            <PasswordInput />
            <PasswordInput id='password2'/>
            <SubmitLinkPair url='/login' linkText='Log in' submitText='Register'/>
          </Col>
          <Col md={2} />
          <Col md={6}>
            <LoremIpsum />
          </Col>
        </Row>
        <Errors errorMessages={errors} />
      </Container>
    </Form>
  )
}

export default RegisterForm
