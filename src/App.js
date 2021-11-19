import React from 'react'
import './App.css'
import { Routes } from './routes/Routes'
import { AuthProvider } from './Auth'

export const App = () => {
  return (
    <div className='app'>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </div>
  )
}
