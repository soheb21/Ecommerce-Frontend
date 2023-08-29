import React from 'react'
import Navbar from '../features/NavBar/Navbar'
import UserOrders from '../features/userInfo/components/UserOrders'

const MyOrderPage = () => {
    return (
        <Navbar>
            <UserOrders />
        </Navbar>
    )
}

export default MyOrderPage