import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'


function ProtectRouter({allowedRoles}) {
    const {userAuth} = useSelector(user => user?.users)
    const location = useLocation()
  return (  
    userAuth?.roles?.find(role => allowedRoles?.includes(role))
    ? <Outlet />
    : userAuth
        ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        : <Navigate to="/login" state={{ from: location }} replace />
  )
}

export default ProtectRouter