import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import BooksList from './components/BooksList'
import Header from './components/Header'

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

  const handleRemoveBook = (id) => {
    axios
      .delete(`${BASE_URL}/books/${id}`)
      .then(e => {
        console.log(e)
        handleGetBooks()
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
      <Header handleAddBook={handleAddBook} />
      <BooksList books={books} handleRemoveBook={handleRemoveBook} />
    </div>
  )
}

export default App
