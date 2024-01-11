import React, {useState, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../slices/userSlice'

const Profil = (props)=>{
    
    const user = useSelector(selectUser)
    return (
        <div>
            <h1>Profil de: {user.infos.firstName} {user.infos.lastName}</h1>
            <p>{user.infos.email}</p>
            <p>{user.infos.address}</p>
            <p>{user.infos.zip}</p>
            <p>{user.infos.city}</p>
            
        </div>
    )
}

export default Profil