import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { Errors } from '../components/Forms/FormComponents/Errors.js'
import { LoremIpsum } from '../components/LoremIpsum.js'
import { Col, Container, Row } from 'react-bootstrap'
import { LoginForm } from '../components/Forms/LoginForm.js'
import { useUser } from '../contexts/UserContext.js'

const LoginPage = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const { setAuthed, authAxios } = useAuth()
  const { setName, setEmail, setRole } = useUser()

  const updateUserInfo = (user) => {
    setName(user.full_name)
    setEmail(user.email)
    setRole(user.role)
    setAuthed(true)
  }

  useEffect(() => {
    const tryLogin = async () => {
      const user = await authAxios.get('/users/login/success')
      updateUserInfo(user.data)
      navigate('/books')
    }
    tryLogin()
  }, [])

  const onSubmit = (e) => {
    const doSubmit = async (e) => {
      e.preventDefault()

      const input = {
        email: e.target[0].value,
        password: e.target[1].value
      }

      const response = await authAxios.post('/users/login', input)
      const token = response.data.token
      localStorage.setItem('token', token)

      updateUserInfo(response.data.user)
      navigate('/books')
    }

    doSubmit(e)
      .catch(e => setErrorMessage(e.message))
  }

  const Title = () => <h2 style={{ marginBottom: '2rem' }}>Log in</h2>

  return (
    <Container style={{ marginTop: '5rem' }}>
      <Row>
        <Col md={4} style={{ marginBottom: '5rem' }}>
          <Title />
          <LoginForm onSubmit={e => onSubmit(e)}/>
        </Col>
        <Col md={2} />
        <Col md={6}> <LoremIpsum /> </Col>
      </Row>
      <Errors errorMessages={errorMessage}/>
    </Container>
  )
}

export default LoginPage
