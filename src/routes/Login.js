import React from 'react'
import LoginForm from '../components/LoginForm'
import { Link } from 'react-router-dom'
// import axios from 'axios'

export const Login = () => {
  return (
    <div>
      <LoginForm />
      <Link to="/">Register</Link>
    </div>
  )
}