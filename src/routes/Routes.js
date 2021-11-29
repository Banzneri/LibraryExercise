import React from 'react'
import { BrowserRouter as Router, Routes as ReactRoutes, Route } from 'react-router-dom'
import { Register } from './Register'
import { Login } from './Login'
import { Books } from './Books'
import { RequireAuth } from '../Components/RequireAuth'
import { Admin } from './Admin'
import { Borrows } from './Borrows'

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
          <Route path='/admin' element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          } />
          <Route path='/borrows' element={
            <RequireAuth>
              <Borrows />
            </RequireAuth>
          } />
      </ReactRoutes>
    </Router>
  )
}
