import React, { useState } from 'react'
import './App.css'
import BooksList from './components/BooksList'
import Header from './components/Header'
import RegisterForm from './components/RegisterForm'

export const App = () => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [languages, setLanguages] = useState([])
  const [volumes, setVolumes] = useState([])

  const booksData = {
    books,
    genres,
    languages,
    volumes,
    setBooks,
    setGenres,
    setLanguages,
    setVolumes
  }

  return (
    <div className='app'>
      <RegisterForm />
      <Header booksData={booksData} />
      <BooksList booksData={booksData} />
    </div>
  )
}
