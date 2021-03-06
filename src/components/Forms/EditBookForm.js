import React from 'react'
import { Form } from 'react-bootstrap'
import PropTypes from 'prop-types'
import { SelectInput } from './FormComponents/SelectInput'
import { SubmitLinkPair } from './FormComponents/SubmitLinkPair'
import { TextInput } from './FormComponents/TextInput'

export const EditBookForm = ({ onSubmit, book, genres, languages }) => (
  <Form onSubmit={onSubmit}>
    <TextInput text='Title' type='text' message='' defaultValue={book?.name}/>
    <TextInput text='Year' type='year' message='' defaultValue={book?.release_year}/>
    <SelectInput labelText='Genre' options={genres} id='genre' defaultValue={book?.genre_id} />
    <SelectInput labelText='Language' options={languages} id='language' defaultValue={book?.language_id} />
    <SubmitLinkPair url='/books' linkText='Cancel' submitText='Edit book'/>
    <br/>
  </Form>
)

EditBookForm.propTypes = {
  onSubmit: PropTypes.func,
  book: PropTypes.object,
  genres: PropTypes.array,
  languages: PropTypes.array
}
