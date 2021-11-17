import React from 'react'
import { Route } from 'react-router'
import BooksList from './components/BooksList'
import RegisterForm from './components/RegisterForm'
import { App } from './App'

export default (
  <Route path='/' component={RegisterForm}>
    <Route path='/BooksList' component={BooksList}/>
    <Route path='/App' component={App}/>
  </Route>
)
