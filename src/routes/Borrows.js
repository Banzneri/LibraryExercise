import React from 'react'
import { Header } from '../Components/Header'
import { BorrowsPage } from '../pages/BorrowsPage'

export const Borrows = () => (
  <div>
    <Header headerText='My borrows' page='borrows' />
    <BorrowsPage />
  </div>
)
