import React from 'react'
import AddBookForm from '../Components/Forms/AddBookForm'
import { BooksList } from '../Components/BooksList'
import { Header } from '../Components/Header'

export const Admin = () => (
  <div>
    <Header />
    <AddBookForm />
    <BooksList />
  </div>
)
