import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {selectBasket, modifyBasket, cleanBasket} from '../slices/basketSlice'
import moment from 'moment';
import localization from 'moment/locale/fr';
moment.updateLocale('fr', localization);

const Basket = (props)=>{
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()
    
    const removeToBasket = (basket, myLesson) =>{
    	//on récupère l'ancien panier en supprimant l'élément qu'on ne veut plus
        let newBasket = basket.filter(b => b.id !== myLesson.id);
        //on met à jour le storage et redux avec le nouveau panier
        let lsBasket = JSON.stringify(newBasket);
        window.localStorage.setItem('coachme-basket', lsBasket);
        
        dispatch(modifyBasket(newBasket))
    }
    
    const vider = ()=>{
        window.localStorage.removeItem("coachme-basket")
        dispatch(cleanBasket())
    }
    
    return (
		<div>
			<h2>Panier</h2>
			{basket.basket.length > 0 ? <table className="basket-table">
			    <thead>
    				<tr>
    					<th>Coach</th>
    					<th>Sport</th>
    					<th>Date</th>
    					<th>Prix</th>
    					<th>Action</th>
    				</tr>
				</thead>
				<tfoot>
				    <tr>
				        <td colspan={5}>
			            	<button 
								className="red-button"
								onClick={(e)=>{
									vider()
								}}
							>
								Vider le panier
							</button>
				        </td>
				    </tr>
				</tfoot>
				<tbody>
					{basket.basket.map((lesson)=>{
						return (<tr key={lesson.id}>
							<td>{lesson.firstName} {lesson.lastName}</td>
								<td>{lesson.sport}</td>
								<td>{moment(lesson.start).format('L')} : {moment(lesson.start).format('LT')} / {moment(lesson.end).format('LT')}</td>
								<td>{lesson.price} €</td>
								<td>
									<button 
										className="red-button"
										onClick={(e)=>{
											removeToBasket(basket.basket, lesson)
										}}
									>
										Supprimer
									</button>
								</td>
						</tr>)
					})}
				</tbody>
				
			</table> : <p>Votre panier est vide</p>}
			
			<Link to="/payment">Payer</Link>
			
		</div>
	)
}

export default Basket