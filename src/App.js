/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import BooksList from './components/BooksList'
import Header from './components/Header'
import BookEdit from './components/BookEdit'

const BASE_URL = 'http://localhost:3001'

const App = () => {
  const [books, setBooks] = useState([])
  const [selectedBook, setSelectedBook] = useState({})
  const [genres, setGenres] = useState([])
  const [languages, setLanguages] = useState([])
  const [volumes, setVolumes] = useState([])

  useEffect(() => {
    handleGetVolumes()
    handleGetGenres()
    handleGetLanguages()
    handleGetBooks()
  }, [])

  const handleGetBooks = () => {
    const sortByNameAndReturnNew = (books) => {
      const sortedBooks = Array.from(books)

      sortedBooks.sort((a, b) => {
        const nameA = a.name.toUpperCase()
        const nameB = b.name.toUpperCase()
        if (nameA < nameB) {
          return -1
        }
        if (nameA > nameB) {
          return 1
        }
        return 0
      })

      return sortedBooks
    }

    axios
      .get(`${BASE_URL}/books`)
      .then(books => {
        const bookList = sortByNameAndReturnNew(books.data)
        setBooks(bookList)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleGetGenres = () => {
    axios
      .get(`${BASE_URL}/genres`)
      .then(genres => {
        setGenres(genres.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleGetLanguages = () => {
    axios
      .get(`${BASE_URL}/languages`)
      .then(languages => {
        setLanguages(languages.data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleRemoveBook = (event, id) => {
    event.stopPropagation()
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

  const handleEditBook = (book) => {
    const bookToUpdate = getBookDataFromElementId('edit')

    axios
      .put(`${BASE_URL}/books/${book.id}`, bookToUpdate)
      .then(e => {
        handleGetBooks()
        document.getElementById('edit-book').style.display = 'none'
        console.log(e)
      })
  }

  const handleGetVolumes = () => {
    axios
      .get(`${BASE_URL}/volumes`)
      .then(e => {
        setVolumes(e.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const handleAddVolume = (id) => {
    axios
      .post(`${BASE_URL}/volumes/${id}`)
      .then(e => {
        console.log(e)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleAddBook = () => {
    const book = getBookDataFromElementId('add')

    axios
      .post(`${BASE_URL}/books`, book)
      .then(e => {
        handleAddVolume(e.data[0].id)
        handleGetBooks()
      })
      .catch(error => {
        console.log(error)
      })
  }

  const handleViewBook = (book) => {
    setSelectedBook(book)
    document.getElementById('edit-name').value = book.name
    document.getElementById('edit-year').value = book.release_year
    document.getElementById('edit-genre').value = book.genre_id
    document.getElementById('edit-language').value = book.language_id
    document.getElementById('edit-volume').value = volumes.filter(e => e.book_id === book.id).length
    const editBook = document.getElementById('edit-book')
    editBook.style.display = 'block'
  }

  function getBookDataFromElementId (id) {
    const name = document.getElementById(`${id}-name`).value
    const release_year = Number(document.getElementById(`${id}-year`).value)
    const genre_id = Number(document.getElementById(`${id}-genre`).value)
    const language_id = Number(document.getElementById(`${id}-language`).value)

    const book = {
      name,
      release_year,
      genre_id,
      language_id
    }

    return book
  }

  return (
    <div className='app'>
      <Header handleAddBook={handleAddBook} genres={genres} languages={languages}/>
      <BooksList
        books={books}
        handleRemoveBook={handleRemoveBook}
        handleViewBook={handleViewBook}
        genres={genres}
        languages={languages}
        volumes={volumes} />
      <BookEdit
        handleEditBook={handleEditBook}
        book={selectedBook}
        genres={genres}
        languages={languages}
        volumes={volumes} />
    </div>
  )
}

export default App
