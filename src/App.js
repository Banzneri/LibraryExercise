import React from 'react'
import './App.css'
import { Routes } from './routes/Routes'
import { AuthProvider } from './contexts/AuthContext'
import { BooksProvider } from './contexts/BooksContext'

export const App = () => (
  <BooksProvider>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </BooksProvider>
)
