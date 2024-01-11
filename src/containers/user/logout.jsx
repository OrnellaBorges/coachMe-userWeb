import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {logoutUser} from '../../slices/userSlice'

const Logout = (props)=>{
    const dispatch = useDispatch()
    const [redirect, setRedirect] = useState(false)
    useEffect(()=>{
        window.localStorage.removeItem("coachme-user-token")
        dispatch(logoutUser())
        setRedirect(true)
    }, [])
    
    if(redirect){
        return <Navigate to="/login"/>
    }
    return (
        <div>
            <h1>Ciao Bello!</h1>
        </div>
    )
}

export default Logout