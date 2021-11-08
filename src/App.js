import React, { useState } from 'react'
import './App.css'
import axios from 'axios'
import Book from './components/Book'

const BASE_URL = 'http://localhost:3001'

const App = () => {
  const [books, setBooks] = useState([])

  const handleGetBooks = () => {
    axios
      .get(`${BASE_URL}/books`)
      .then(books => {
        setBooks(books.data)
        console.log(books.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='app'>
      <div className='flex-container' id='header'>
        <h1>Books</h1>
        <input id='search-button' type='button' onClick={handleGetBooks} value='search'/>
      </div>
      <div className='flex-container' id='books-list'>
        {books.map(b => <Book book = {b} key = {b.id} />)}
      </div>
    </div>
  )
}

export default App
