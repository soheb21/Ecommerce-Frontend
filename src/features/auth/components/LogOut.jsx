import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectUsers, sigOutAsync } from '../authSlice'

const LogOut = () => {
    const user = useSelector(selectUsers)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(sigOutAsync())
    }, [])
   
    return (
        <>
            {!user && <Navigate to={"/login"} replace={true} />}
        </>
    );
}

export default LogOut