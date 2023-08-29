import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUserInfo } from '../../userInfo/userSlice'
import { selectUsers } from '../authSlice'

const ProteectedAdmin = ({ children }) => {     
    const user = useSelector(selectUsers)
    const userInfo=useSelector(selectUserInfo)
    if (!user) {
        <Navigate to={"/login"} replace={true}  />
    }
    if (user && userInfo.role !== "admin") {
        <Navigate to={"/"}  replace={true} />
    }
    return children
}

export default ProteectedAdmin