import React from 'react'
import './App.css'
import { BooksList } from './components/BooksList'
import { Header } from './components/Header'

export const App = () => {
  return (
    <div className='app'>
      <Header />
      <BooksList />
    </div>
  )
}
