import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUser } from '../slices/userSlice'
import { selectBasket } from '../slices/basketSlice'


//Gestion de la naivgation
const Header = (props)=>{
	
	const user = useSelector(selectUser)
	const basket = useSelector(selectBasket)
    return (
		<div className="header-nav">
			<nav>
				{user.isLogged ? <div>
					<Link to="/">Accueil</Link>
					<Link to="/search">Cours</Link>
					<Link to="/basket">Panier {basket.basket.length > 0 && <span className="span-basket">{basket.basket.length}</span> }</Link>
					<Link to="/profil">Profil</Link>
					<Link to="/logout">Se déconnecter</Link>
				</div> : <div>
					<Link to="/register">S'enregister</Link>
					<Link to="/login">Se connecter</Link>
				</div>}
			    
			</nav>
		</div>
	)
}

export default Header;

		
		