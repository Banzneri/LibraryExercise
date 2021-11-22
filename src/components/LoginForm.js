import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Auth.js'

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  const { authed, setAuthed } = useAuth()

  useEffect(() => {
    axios
      .post('http://localhost:3001/users/login', user, { withCredentials: true })
      .then(e => {
        setAuthed(true)
        console.log(authed)
        navigate('/books')
      })
      .catch(e => {
        setErrorMessage('wrong username or password')
      })
  }, [user])

  const onSubmit = (e) => {
    e.preventDefault()

    const user = {
      email: e.target[0].value,
      password: e.target[1].value
    }

    setUser(user)
  }

  return (
    <div id='login'>
      <div className='flex-container auth-header'>
        <h2>Login</h2>
        |&nbsp;
        {errorMessage &&
          <span className='error-message'>
            <p className='line'>{errorMessage}&nbsp;|&nbsp;</p>
          </span>}
      </div>
      <form onSubmit={(e) => onSubmit(e)} id='login-form'>
        <label htmlFor='email'> Email: </label>
        <input type='email' id='email' required />
        <label htmlFor='password'> Password: </label>
        <input type='password' id='password' required />
        <input type='submit' value='Submit'/>
      </form>
    </div>
  )
}

export default LoginForm
