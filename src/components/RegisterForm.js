import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [errors, setErrors] = useState([])
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
        setErrors(error.response.data.errors)
      })
  }

  return (
    <div id='register'>
      <div className='flex-container auth-header'>
        <h2>Register</h2>
        |&nbsp;{errors && errors.map(e => <p className='error-message' key={e.message}>{e.message} &nbsp;|&nbsp;</p>)}
      </div>
      <form onSubmit={(e) => onSubmit(e)} id='register-form'>
        <label htmlFor='user-name'> Name: </label>
        <input type='text' id='user-name' required />
        <label htmlFor='email'> Email: </label>
        <input type='email' id='email' required />
        <label htmlFor='password'> Password: </label>
        <input type='password' id='password' required />
        <label htmlFor='password2'> Confirm password: </label>
        <input type='password' id='password2' required />
        <input type='submit' value='Submit'/>
      </form>
    </div>
  )
}

export default RegisterForm
