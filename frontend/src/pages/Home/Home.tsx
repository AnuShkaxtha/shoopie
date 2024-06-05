import React from 'react'
import MainCarousel from './MainCarousel'
import ShoppingList from './ShoppingList'

const Home: React.FC = () => {
  return (
    <div>
      <MainCarousel />
      <ShoppingList/>
    </div>
  )
}

export default Home