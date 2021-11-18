import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Register } from './routes/Register'
import { Login } from './routes/Login'
import { Books } from './routes/Books'
import { RequireAuth } from './components/RequireAuth'
import { AuthProvider } from './Auth'

export const App = () => {
  return (
    <div className='app'>
      <AuthProvider>
        <Router>
          <Routes>
              <Route path='/' element={<Register />}/>
              <Route
                path='/books'
                element={
                    <RequireAuth>
                      <Books />
                    </RequireAuth>
                }/>
              <Route path='/login' element={<Login />}/>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}
