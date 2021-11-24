import React from 'react'
import './App.css'
import { Routes } from './routes/Routes'
import { AuthProvider } from './contexts/AuthContext'
import { BooksProvider } from './contexts/BooksContext'
import { Container } from 'react-bootstrap'

export const App = () => (
  <Container>
    <BooksProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BooksProvider>
  </Container>
)
