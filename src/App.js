import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import Book from './components/Book'
import AddBookForm from './components/AddBookForm'

const BASE_URL = 'http://localhost:3001'

const App = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    handleGetBooks()
  }, [])

  const handleGetBooks = () => {
    axios
      .get(`${BASE_URL}/books`)
      .then(books => {
        setBooks(books.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleAddBook = () => {
    const name = document.getElementById('form-name').value
    const year = document.getElementById('form-year').value
    const genre = document.getElementById('form-genre').value
    const language = document.getElementById('form-language').value

    const book = {
      name: name,
      release_year: year,
      genre_id: genre,
      language_id: language
    }

    axios
      .post(`${BASE_URL}/books`, book)
      .then(e => {
        console.log(e)
        handleGetBooks()
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='app'>
      <div className='flex-container' id='header'>
        <h1>Books</h1>
        <AddBookForm handleAddBook={handleAddBook}/>
      </div>
      <div className='grid-container' id='books-list'>
        {books.map(b => <Book book = {b} key = {b.id} />)}
      </div>
    </div>
  )
}

export default App
