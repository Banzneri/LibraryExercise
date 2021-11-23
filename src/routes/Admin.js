import React from 'react'
import AddBookForm from '../components/AddBookForm'
import { BooksList } from '../components/BooksList'
import { Header } from '../components/Header'

export const Admin = () => (
  <div>
    <Header />
    <AddBookForm />
    <BooksList />
  </div>
)
