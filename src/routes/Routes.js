import React from 'react'
import { BrowserRouter as Router, Routes as ReactRoutes, Route } from 'react-router-dom'
import { Register } from './Register'
import { Login } from './Login'
import { Books } from './Books'
import { RequireAuth } from '../components/RequireAuth'
import { Admin } from './Admin'

export const Routes = () => {
  return (
    <Router>
      <ReactRoutes>
        <Route path='/' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route
          path='/books'
          element={
            <RequireAuth>
              <Books />
            </RequireAuth>
          } />
          <Route path='/admin' element={<Admin />} />
      </ReactRoutes>
    </Router>
  )
}
