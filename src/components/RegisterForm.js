import React, { useState } from 'react'
import axios from 'axios'

const RegisterForm = () => {
  const [errors, setErrors] = useState([])

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
        console.log(e)
      })
      .catch(error => {
        setErrors(error.response.data.errors)
      })
  }

  return (
    <div id='registerForm'>
      {errors && errors.map(e => <p key={e.message}>{e.message}</p>)}
      <form onSubmit={(e) => onSubmit(e)}>
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
