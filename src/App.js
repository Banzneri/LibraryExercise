import React from 'react'
import './App.css'
import { Routes } from './routes/Routes'
import { AuthProvider } from './contexts/AuthContext'
import { BooksProvider } from './contexts/BooksContext'
import { UserProvider } from './contexts/UserContext'

export const App = () => (
  <UserProvider>
    <BooksProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BooksProvider>
  </UserProvider>
)
