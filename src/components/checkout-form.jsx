import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {loadStripe} from '@stripe/stripe-js';
import {useSelector, useDispatch} from 'react-redux'
import {selectUser} from '../slices/userSlice'
import {selectBasket, modifyBasket, cleanBasket} from '../slices/basketSlice';
import {Navigate} from 'react-router-dom';
import {checkPayment, validatePayment} from '../api/lesson'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'

const CheckoutForm = (props) =>{
    
    
    const [error, setError] = useState(false)
    const [redirectSuccess, setRedirectSuccess] = useState(false)


    const basket = useSelector(selectBasket)
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    
    const stripe = useStripe();
    const elements = useElements();

    const removeToBasket = (basket, myLesson) =>{
        let newBasket = basket.filter(b => b.id !== myLesson.id);
        
        let lsBasket = JSON.stringify(newBasket);
        window.localStorage.setItem('coachme-basket', lsBasket);
        
        dispatch(modifyBasket(newBasket))
    }
    
    //fonction de paiement lors de la validation de la CB
    const handleSubmit = async (e) =>{
        e.preventDefault()
        
        if(!stripe || !elements){
            setError('Problème avec le terminal de paiement')
            return
        }
        
        let datas = {
            email: user.infos.email,
            basket: basket.basket
        }
        
        //gestion du paiement via stripe
        //on va checker via stripe dans le backend si le paiement est réalisable
        const paymentAuth = await checkPayment(datas)
        //si jamais le paiement ne passe pas
        if(paymentAuth.status === 500){
            setError("Echec de la vérification du paiement")
        }
        
        //on stock la réponse de la tentative de paiement vers stripe dans la variable secret
        const secret = paymentAuth.client_secret
        //on confirme l'envoi du paiement
        const payment = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: user.infos.email
                }
            }
        })
        //payment va renvoyer la réponse (succés ou echec de paiement)
         console.log(payment)
        //gestion des erreurs
        if(payment.error){
            setError("Echec de la tentative de paiement")
        }else{
            //si le paiement est réussi
            if(payment.paymentIntent.status === "succeeded"){
                console.log("MONEY IS IN THE BANK")
                let data = {
                    user_id: user.infos.id,
                    basket: basket.basket
                }
                //on enregistre dans la bdd la commande
                validatePayment(data)
                .then((res)=>{
                    setRedirectSuccess(true)
                })
                .catch(err=>console.log(err))
            }
        }
    }
    
    if(redirectSuccess){
        return <Navigate to="/success" />
    }
    return (
        <section>
            {error !== null && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                        base: {
                          color: "#32325d",
                          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                          fontSmoothing: "antialiased",
                          fontSize: "16px",
                          "::placeholder": {
                            color: "#aab7c4",
                          },
                        },
                        invalid: {
                          color: "#fa755a",
                          iconColor: "#fa755a",
                        },
                      },
                    }}
                        
                />
                <button
                    disabled={props.stripe}
                >Payer</button>
            </form>
        </section>
    ) 
}

export default CheckoutForm