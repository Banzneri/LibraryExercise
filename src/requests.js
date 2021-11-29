import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const updateBooks = (setBooks) => {
  axios
    .get(`${BASE_URL}/books`, { withCredentials: true })
    .then(books => {
      console.log(books.data)
      setBooks(Array.from(books.data))
    })
    .catch(error => {
      console.log(error)
    })
}

export const updateBooksAlt = (setBooks) => {
  axios
    .get(`${BASE_URL}/booksAlt`, { withCredentials: true })
    .then(books => {
      console.log(books.data)
      setBooks(books.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export const updateGenres = (setGenres) => {
  axios
    .get(`${BASE_URL}/genres`)
    .then(genres => {
      setGenres(genres.data)
    })
    .catch(error => {
      console.log(error)
    })
}

export const updateLanguages = (setLanguages) => {
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
    .delete(`${BASE_URL}/books/${id}`, { withCredentials: true })
    .then(e => {
      updateBooks(setBooks)
      console.log(e)
    })
    .catch(error => {
      console.log(error)
    })
}

export const editBook = (book, setBooks) => {
  const bookToUpdate = book
  axios
    .put(`${BASE_URL}/books/${book.id}`, bookToUpdate, { withCredentials: true })
    .then(e => {
      updateBooks(setBooks)
      console.log(e)
    })
}

export const updateVolumes = (setVolumes) => {
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
    .post(`${BASE_URL}/books`, book, { withCredentials: true })
    .then(e => {
      updateBooks(setBooks)
      AddVolumeByBookId(e.data[0].id)
    })
    .catch(error => {
      console.log(error)
    })
}

export const AddVolumeByBookId = (id) => {
  axios
    .post(`${BASE_URL}/volumes/${id}`, { withCredentials: true })
    .then(e => {
      console.log(e)
    })
    .catch(error => {
      console.log(error)
    })
}

export const logout = () => {
  axios
    .get(`${BASE_URL}/users/logout`)
    .then(e => {
      console.log(e)
    })
    .catch(e => {
      console.log(e)
    })
}

export const getBorrowsByCurrentUser = (setBorrows) => {
  axios
    .get(`${BASE_URL}/user/borrows`, { withCredentials: true })
    .then(borrows => {
      setBorrows(borrows.data)
    })
}
