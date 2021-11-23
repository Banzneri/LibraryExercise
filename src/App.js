import React from 'react'
import './App.css'
import { Routes } from './routes/Routes'
import { AuthProvider } from './contexts/AuthContext'
import { BooksProvider } from './contexts/BooksContext'

export const App = () => (
  <div className='app'>
    <BooksProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BooksProvider>
  </div>
)
