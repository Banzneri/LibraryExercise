import React from 'react'
import { Header } from '../Components/Header'
import { useUser } from '../contexts/UserContext'
import { BorrowsPage } from '../pages/BorrowsPage'

export const Borrows = () => {
  const { name } = useUser()
  const header = `Borrows for ${name}`
  return (
    <div>
      <Header headerText={header} page='borrows' />
      <BorrowsPage />
    </div>
  )
}
