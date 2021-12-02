import React from 'react'
import * as requests from '../../requests.js'
import { useBooks } from '../../contexts/BooksContext.js'
import { Container, Form } from 'react-bootstrap'
import { SelectInput, SubmitLinkPair, TextInput } from './FormComponents/FormComponents.js'
import { useNavigate } from 'react-router'

const AddBookForm = () => {
  const { genres, languages, setBooks } = useBooks()
  const navigate = useNavigate()

  const onSubmit = (e) => {
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

    requests.addBook(book, setBooks)
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
