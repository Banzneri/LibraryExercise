import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth.js'

const LoginForm = () => {
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  const { authed, setAuthed } = useAuth()

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: e.target[0].value,
      password: e.target[1].value
    }

    axios
      .post('http://localhost:3001/users/login', user, { withCredentials: true })
      .then(e => {
        setAuthed(true)
        console.log(authed)
        navigate('/books')
      })
      .catch(e => {
        setMessage('wrong username or password')
      })
  }

  return (
    <div id='login-form'>
      <form onSubmit={(e) => onSubmit(e)}>
        <label htmlFor='email'> Email: </label>
        <input type='email' id='email' required />
        <label htmlFor='password'> Password: </label>
        <input type='password' id='password' required />
        <input type='submit' value='Submit'/>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default LoginForm
