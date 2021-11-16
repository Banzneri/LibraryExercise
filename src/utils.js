/* eslint-disable camelcase */
export const getBookDataFromElementId = (id) => {
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
