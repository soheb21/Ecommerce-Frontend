import React from 'react'
import Navbar from '../features/NavBar/Navbar'
import Product from '../features/product-list/Product'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';

const Home = () => {
  return (
    <Navbar>
     
      <Product />
    </Navbar>
  )
}

export default Home