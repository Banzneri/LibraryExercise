import React, { useState, useEffect } from 'react'

export const Test = () => {
  const [currentCategory, setCurrentCategory] = useState(null)
  const [books, setBooks] = useState(null)

  useEffect(() => {
    const booksByCategory = books.filter(e => e.category === currentCategory)
    setBooks(booksByCategory)
  }, [currentCategory])

  setCurrentCategory('scifi')

  return (
    <div>
      {books && books.map(b => <p key={b.id}>{b}</p>)}
    </div>
  )
}
