import React from 'react'
import AddBookForm from '../Components/Forms/AddBookForm'
import { Header } from '../Components/Header'
import { BooksPage } from '../pages/BooksPage'

export const Admin = () => (
  <div>
    <Header />
    <AddBookForm />
    <BooksPage />
  </div>
)
