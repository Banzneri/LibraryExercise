import React from 'react'
import { Header } from '../Components/Header'
import { BooksPage } from '../pages/BooksPage'

export const Books = () => (
  <div>
    <Header headerText='All books' page='books' />
    <BooksPage />
  </div>
)
