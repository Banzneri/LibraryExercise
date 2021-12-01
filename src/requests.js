import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export const getBooks = (setBooks) => {
  return axios
    .get(`${BASE_URL}/books`, { withCredentials: true })
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
      getBooks(setBooks)
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
      getBooks(setBooks)
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
      getBooks(setBooks)
      addVolumeByBookId(e.data[0].id)
    })
    .catch(error => {
      console.log(error)
    })
}

export const addVolumeByBookId = (id) => {
  return axios
    .post(`${BASE_URL}/volumes/${id}`, { withCredentials: true })
}

export const getAllVolumesByBookId = (id) => {
  return axios.get(`${BASE_URL}/volumes/${id}`,
    { withCredentials: true })
}

export const getAvailableVolumesByBookId = (id) => {
  return axios.get(`${BASE_URL}/volumes/book/${id}`,
    { withCredentials: true })
}

export const addBorrow = (id) => {
  return axios.post(`${BASE_URL}/user/borrows/volume`,
    { volumeId: id },
    { withCredentials: true })
}

export const logout = () => {
  axios
    .get(`${BASE_URL}/users/logout`)
    .then(e => {
      console.log(e)
    })
}

export const getBorrowsByCurrentUser = () => {
  return axios.get(`${BASE_URL}/user/borrows`,
    { withCredentials: true })
}

export const getBooksByGenreId = (id) => {
  return axios
    .get(`${BASE_URL}/books/genres/${id}`,
      { withCredentials: true })
}

export const getBookByVolumeId = (id) => {
  return axios.get(`${BASE_URL}/books/volumes/${id}`,
    { withCredentials: true })
}

export const getBooksByVolumeIds = (volumeIds) => {
  return axios.all(volumeIds.map(e => getBookByVolumeId(e)))
}
