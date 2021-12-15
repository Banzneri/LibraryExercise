import React from 'react'
import { useBooks } from '../../contexts/BooksContext.js'
import { Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import { SelectInput } from './FormComponents/SelectInput.js'
import { SubmitLinkPair } from './FormComponents/SubmitLinkPair.js'
import { TextInput } from './FormComponents/TextInput.js'
import { addBook } from '../../LibraryService.js'

const AddBookForm = () => {
  const { genres, languages } = useBooks()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const name = e.target[0].value
    const releaseYear = e.target[1].value
    const genreId = e.target[2].value
    const languageId = e.target[3].value

    const book = {
      name,
      releaseYear,
      genreId,
      languageId
    }

    await addBook(book)
    navigate('/books')
  }

  return (
    <Container>
      <Form onSubmit={e => onSubmit(e)}>
        <TextInput text='Title' />
        <TextInput text='Year' type='year'/>
        <SelectInput labelText='Genre' options={genres} />
        <SelectInput labelText='Language' options={languages} />
        <SubmitLinkPair url='/books' linkText='Close' submitText='Add book' />
        <br/><br/>
      </Form>
    </Container>
  )
}

export default AddBookForm
