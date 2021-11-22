import React from 'react'
import AddBookForm from '../components/AddBookForm'
import { BooksList } from '../components/BooksList'

export const Admin = () => {
  return (
    <div>
      <AddBookForm />
      <BooksList />
    </div>
  )
}
