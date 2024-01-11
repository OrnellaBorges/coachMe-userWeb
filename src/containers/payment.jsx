import React from 'react';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from '../components/checkout-form'
import {Elements} from '@stripe/react-stripe-js';
import {Link} from 'react-router-dom';

const Payment = (props) =>{
    
    const stripePromise = loadStripe("pk_test_51IzetcLJHwOB3xS8Z9ADczpOFPVzQjpcnZFrPUMb3Lcs1oRlAvtU9qUQTJaTTmP7nMF1F9d8gzaJ2COoyKcmxehH00lUA6H5EK")
    
    return (
        <section>
            <h2>Payment</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm/>
            </Elements>
        </section>
    )
}

export default Payment