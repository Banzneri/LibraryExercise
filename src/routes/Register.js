import React from 'react'
import RegisterForm from '../components/RegisterForm'
import { Link } from 'react-router-dom'

export const Register = () => (
  <div>
    <RegisterForm />
    <Link to="/login">Login</Link>
  </div>
)
