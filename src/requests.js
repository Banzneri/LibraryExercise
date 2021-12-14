import axios from 'axios'
import { BASE_URL } from './constants'

const token = localStorage.getItem('token')

const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: token
  }
})

export const getBooks = () => {
  return authAxios
    .get('/books')
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

export const removeBook = (id) => {
  return authAxios
    .delete(`/books/${id}`)
}

export const editBook = (book, setBooks) => {
  const bookToUpdate = book
  authAxios
    .put(`/books/${book.id}`, bookToUpdate)
    .then(e => {
      getBooks(setBooks)
      console.log(e)
    })
}

export const updateVolumes = (setVolumes) => {
  authAxios
    .get('/volumes')
    .then(volumes => {
      setVolumes(volumes.data)
    })
    .catch(e => {
      console.log(e)
    })
}

export const addBook = (book, setBooks) => {
  authAxios
    .post('/books', book)
    .then(e => {
      getBooks(setBooks)
      addVolumeByBookId(e.data[0].id)
    })
    .catch(error => {
      console.log(error)
    })
}

export const addVolumeByBookId = (id) => {
  return authAxios
    .post(`/volumes/${id}`)
}

export const getAllVolumesByBookId = (id) => {
  return authAxios.get(`/volumes/${id}`)
}

export const getAvailableVolumesByBookId = (id) => {
  return authAxios.get(`/volumes/book/${id}`)
}

export const addBorrow = (id) => {
  return authAxios.post('/user/borrows/volume',
    { volumeId: id })
}

export const logout = () => {
  axios
    .get(`${BASE_URL}/users/logout`)
    .then(e => {
      console.log(e)
    })
}

export const getBorrowsByCurrentUser = (authAxios) => {
  return authAxios.get('/user/borrows')
}

export const getBooksByGenreId = (id) => {
  return authAxios
    .get(`/books/genres/${id}`)
}

export const getBookByVolumeId = (authAxios, id) => {
  return authAxios.get(`/books/volumes/${id}`)
}

export const getBooksByVolumeIds = (authAxios, volumeIds) => {
  return Promise
    .all(volumeIds.map(e => getBookByVolumeId(authAxios, e)))
    .then(axios.spread((...res) => {
      const books = res.map(e => e.data).flat()
      return books
    }))
}

export const returnBorrowedBook = (volumeId) => {
  return authAxios.delete(`/borrows/volumes/${volumeId}`)
}

export const borrowBookByBookId = (bookId) => {
  return authAxios.post(`/user/borrows/books/${bookId}`,
    { id: bookId })
}

export const deleteVolumeByBookId = (bookId) => {
  return authAxios.delete(`/volumes/book/${bookId}`)
}

export const deleteVolumeById = (id) => {
  return authAxios.delete(`/volumes/${id}`)
}
