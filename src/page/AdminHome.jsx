import React from 'react'
import AdminList from '../features/admin/components/AdminList'

import Navbar from '../features/NavBar/Navbar'

const AdminHome = () => {
    return (
        <Navbar>
         <AdminList/>
        </Navbar>
    )
}

export default AdminHome