import React from 'react'
import Cart from '../features/cart/Cart'
import Navbar from '../features/NavBar/Navbar'

const CartPage = () => {
    return (
        <>
            <Navbar>
                <Cart />
            </Navbar>
        </>
    )
}

export default CartPage