
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import { selectUsers } from '../authSlice';

const Protected = ({children}) => {
    const user = useSelector(selectUsers);
    if (!user) {
        return <Navigate to='/login' replace={true}></Navigate>
    }
    return children;
}

export default Protected