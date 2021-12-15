import axios from 'axios'
import { BASE_URL } from './constants'

const createAxios = () => {
  const token = localStorage.getItem('token')

  return axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: token
    }
  })
}

export const getBooks = async () => {
  const books = await createAxios().get('/books')
  return books.data
}

export const getGenres = async () => {
  const genres = await createAxios().get('/genres')
  return genres.data
}

export const getLanguages = async () => {
  const languages = await createAxios().get('/languages')
  return languages.data
}

export const removeBook = (id) => {
  return createAxios()
    .delete(`/books/${id}`)
}

export const editBook = (book, setBooks) => {
  const bookToUpdate = book
  createAxios()
    .put(`/books/${book.id}`, bookToUpdate)
    .then(e => {
      getBooks(setBooks)
      console.log(e)
    })
}

export const getVolumes = async () => {
  const volumes = await createAxios().get('/volumes')
  return volumes.data
}

export const addBook = async (book) => {
  const addedBook = await createAxios().post('/books', book)
  await addVolumeByBookId(addedBook.data[0].id)
}

export const addVolumeByBookId = (id) => {
  return createAxios().post(`/volumes/${id}`)
}

export const getAllVolumesByBook = async (book) => {
  const books = await createAxios().get(`/volumes/${book.id}`)
  return books.data
}

export const getAvailableVolumesByBook = async (book) => {
  const volumes = await createAxios().get(`/volumes/book/${book.id}`)
  return volumes.data
}

export const addBorrow = (id) => {
  return createAxios().post('/user/borrows/volume',
    { volumeId: id })
}

export const logout = () => {
  createAxios()
    .get('/users/logout')
    .then(e => {
      console.log(e)
    })
}

export const getBorrowsByCurrentUser = async () => {
  const borrows = await createAxios().get('/user/borrows')
  return borrows.data
}

export const getBooksByGenreId = async (id) => {
  const books = await createAxios().get(`/books/genres/${id}`)
  return books.data
}

export const getBookByVolumeId = async (id) => {
  const book = await createAxios().get(`/books/volumes/${id}`)
  return book.data
}

export const getBooksByVolumeIds = (volumeIds) => {
  return Promise
    .all(volumeIds.map(id => getBookByVolumeId(id)))
    .then(axios.spread((...res) => {
      const books = res.map(e => e).flat()
      return books
    }))
}

export const returnBorrowedBook = (volumeId) => {
  return createAxios().delete(`/borrows/volumes/${volumeId}`)
}

export const borrowBook = async (book) => {
  const borrowedBook = await createAxios().post(`/user/borrows/books/${book.id}`,
    { id: book.id })
  return borrowedBook.data
}

export const deleteVolumeByBookId = (bookId) => {
  return createAxios().delete(`/volumes/book/${bookId}`)
}

export const deleteVolumeById = (id) => {
  return createAxios().delete(`/volumes/${id}`)
}
