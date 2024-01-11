import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {selectBasket, cleanBasket} from '../slices/basketSlice'

const Success = (props)=>{
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
        window.localStorage.removeItem('coachme-basket');
        dispatch(cleanBasket())
    },[] )
    
    return (
            <div>
                <p>La commande a été effectué avec succès</p>
                <Link to="/">Retour</Link>
            </div>
        )
}

export default Success;