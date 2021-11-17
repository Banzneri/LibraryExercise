import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const getBooks = (setBooks) => {
  axios
    .get(`${BASE_URL}/books`)
    .then(books => {
      console.log(books.data)
      setBooks(books.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export const getBooksAlt = (setBooks) => {
  axios
    .get(`${BASE_URL}/booksAlt`)
    .then(books => {
      console.log(books.data)
      setBooks(books.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export const getGenres = (setGenres) => {
  axios
    .get(`${BASE_URL}/genres`)
    .then(genres => {
      setGenres(genres.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export const getLanguages = (setLanguages) => {
  axios
    .get(`${BASE_URL}/languages`)
    .then(languages => {
      setLanguages(languages.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export const removeBook = (event, id, setBooks) => {
  event.stopPropagation()
  axios
    .delete(`${BASE_URL}/books/${id}`)
    .then(e => {
      getBooks(setBooks)
      console.log(e)
    })
    .catch(error => {
      console.log(error)
    })
}

export const editBook = (book, setBooks) => {
  const bookToUpdate = book
  axios
    .put(`${BASE_URL}/books/${book.id}`, bookToUpdate)
    .then(e => {
      getBooks(setBooks)
      console.log(e)
    })
}

export const getVolumes = (setVolumes) => {
  axios
    .get(`${BASE_URL}/volumes`)
    .then(volumes => {
      setVolumes(volumes.data)
    })
    .catch(e => {
      console.log(e)
    })
}

export const addBook = (book, setBooks) => {
  axios
    .post(`${BASE_URL}/books`, book)
    .then(e => {
      getBooks(setBooks)
      addVolume(e.data[0].id)
    })
    .catch(error => {
      console.log(error)
    })
}

const addVolume = (id) => {
  axios
    .post(`${BASE_URL}/volumes/${id}`)
    .then(e => {
      console.log(e)
    })
    .catch(error => {
      console.log(error)
    })
}
