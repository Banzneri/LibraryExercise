import React from 'react'
import { Header } from '../Components/Header'
import { AdminPage } from '../pages/AdminPage'

export const Admin = () => (
  <div>
    <Header headerText='Admin' page='admin'/>
    <AdminPage />
  </div>
)
