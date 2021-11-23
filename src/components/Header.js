import React from 'react'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext.js'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constants'

export const Header = () => {
  const { setAuthed } = useAuth()
  const navigate = useNavigate()

  const logOut = () => {
    axios
      // eslint-disable-next-line quotes
      .get(`${BASE_URL}/users/logout`, { withCredentials: true })
      .then(e => {
        setAuthed(false)
        navigate('/login')
        console.log(e)
      })
  }

  const admin = () => {
    navigate('/admin')
  }

  return (
    <div className='flex-container' id='header'>
      <h1>Books</h1>
      <div className='flex-container'>
        <input type='button' className='button' onClick={admin} value='Admin' />
        <input type='button' className='button' onClick={logOut} value='Log out' />
      </div>
    </div>
  )
}
