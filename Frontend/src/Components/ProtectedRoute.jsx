import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
  const isAuth = JSON.parse(localStorage.getItem("isAuth"));
    const location = useLocation()
    // const {isAuth} = useSelector((store)=>(store.AuthReducer));
    if(!isAuth){
        return <Navigate to='/login' state={{path:location.pathname}} replace/>
    }

  return children
}

export default ProtectedRoute