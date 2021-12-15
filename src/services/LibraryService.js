const LibraryService = (axios) => {
  function getAllBooks () {
    return axios.get('/book')
  }

  function getAllVolumesByBook (book) {
    return axios.get(`/volumes/${book.id}`)
  }

  function getAvailableVolumesByBook (book) {
    return axios.get(`/volumes/book/${book.id}`)
  }

  function borrowVolume (volume) {
    return axios.post('/user/borrows/volume',
      { volumeId: volume.id })
  }

  function borrowBook (book) {
    return axios.post(`/user/borrows/books/${book.id}`,
      { id: book.id })
  }

  function addVolumeByBook (book) {
    return axios.post(`/volumes/${book.id}`)
  }

  function addBook (book) {
    return axios.post('/books', book)
  }

  function getBookByVolumeId (volumeId) {
    return axios.get(`/books/volumes/${volumeId}`)
  }

  function getBooksByVolumeIds (volumeIds) {
    return Promise
      .all(volumeIds.map(e => getBookByVolumeId(e)))
      .then(axios.spread((...res) => {
        const books = res.map(e => e.data).flat()
        return books
      }))
  }

  function getBorrowsByCurrentUser () {
    return axios.get('/user/borrows')
  }

  return {
    getAllBooks,
    getAllVolumesByBook,
    getAvailableVolumesByBook,
    borrowVolume,
    borrowBook,
    addVolumeByBook,
    addBook,
    getBookByVolumeId,
    getBooksByVolumeIds,
    getBorrowsByCurrentUser
  }
}

export default LibraryService
