import React, { useState, useEffect } from 'react'
import Book from './Book'
import BookEdit from './BookEdit'
import AddBookForm from './AddBookForm'
import { FilterBooks } from './FilterBooks'
import * as requests from '../requests.js'

const sortByNameAndReturnNew = (booksToSort) => {
  const sortedBooks = Array.from(booksToSort)

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

export const BooksList = () => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [languages, setLanguages] = useState([])
  const [volumes, setVolumes] = useState([])
  const [selectedBook, setSelectedBook] = useState(null)

  useEffect(() => {
    requests.getGenres(setGenres)
    requests.getLanguages(setLanguages)
    requests.getVolumes(setVolumes)
    requests.getBooks(setBooks)
  }, [])

  const handleViewBook = (book) => {
    setSelectedBook(book)
  }

  return (
    <div>
      <AddBookForm genres={genres} languages={languages} setBooks={setBooks} />
      <FilterBooks genres={genres} setBooks={setBooks} />
      <div className='grid-container' id='books-list'>
        {books && sortByNameAndReturnNew(books).map(b =>
          <Book
            book={b}
            key={b.id}
            handleRemoveBook={requests.removeBook}
            handleViewBook={handleViewBook}
            setBooks={setBooks}
            volume={volumes.filter(e => e.book_id === b.id)}
            genre={genres.find(e => e.id === b.genre_id)}
            language={languages.find(e => e.id === b.language_id)} />
        )}
        {selectedBook && <BookEdit
          book={selectedBook}
          genres={genres}
          languages={languages}
          setSelectedBook={setSelectedBook}
          setBooks={setBooks} />
        }
      </div>
    </div>
  )
}
