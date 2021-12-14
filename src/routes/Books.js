import React from 'react'
import { Header } from '../components/Header/Header'
import { BooksPage } from '../pages/BooksPage'

export const Books = () => (
  <div>
    <Header headerText='All books' page='books' />
    <BooksPage />
  </div>
)
