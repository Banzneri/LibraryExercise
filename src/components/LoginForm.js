import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.js'
import { BASE_URL } from '../constants.js'

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
