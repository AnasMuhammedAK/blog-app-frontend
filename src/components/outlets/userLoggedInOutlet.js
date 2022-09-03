import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function UserLoggedInOutlet() {
    const { userAuth } = useSelector(state => state.users)
    console.log(userAuth)
  return (
    userAuth ? <Outlet /> : <Navigate to="/login" />
  )
}

export default UserLoggedInOutlet