import React from 'react'
import MainCarousel from '../feature/Home/MainCarousel'
import ShoppingList from '../feature/Home/ShoppingList'

const Home: React.FC = () => {
  return (
    <div>
      <MainCarousel />
      <ShoppingList/>
    </div>
  )
}

export default Home
