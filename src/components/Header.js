import React from 'react'
import axios from 'axios'
import { useAuth } from '../Auth'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const { setAuthed } = useAuth()
  const navigate = useNavigate()

  const onClick = () => {
    axios
      .get('http://localhost:3001/users/logout', { withCredentials: true })
      .then(e => {
        setAuthed(false)
        navigate('/login')
        console.log(e)
      })
  }

  return (
    <div className='flex-container' id='header'>
      <h1>Books</h1>
      <input type='button' className='button' onClick={onClick} value='Log out' />
    </div>
  )
}
