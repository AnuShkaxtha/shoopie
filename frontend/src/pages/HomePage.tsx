import React from 'react'
import MainCarousel from '../feature/Home/MainCarousel/MainCarousel'
import ShoppingList from '../feature/Home/ShoppingList/ShoppingList'

const Home: React.FC = () => {
  return (
    <div>
      <MainCarousel />
      <ShoppingList/>
    </div>
  )
}

export default Home
