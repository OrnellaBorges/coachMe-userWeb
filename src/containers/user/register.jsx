import React, {useState} from 'react'
import {saveOneUser} from '../../api/user'
import {Navigate} from 'react-router-dom';

const Register = (props)=>{
    
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [address, setAdress] = useState("")
    const [zip, setZip] = useState("")
    const [city, setCity] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [error, setError] = useState(null)
    
    const onSubmitForm = ()=>{
        let datas = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            address: address,
            zip: zip,
            city: city
        }
        
        saveOneUser(datas)
        .then((res)=>{
            if(res.status === 200){
                setRedirect(true)
            }
        })
        .catch(err=>console.log(err))
    }
    
    if(redirect){
        return <Navigate to="/login"/>
    }
    return (
        <div>
            <h1>S'enregister</h1>
            <form
	                className="c-form"
	                onSubmit={(e)=>{
	                    e.preventDefault();
	                    onSubmitForm();
	                }}
	            >
                <input 
					type="text" 
					placeholder="Votre Prénom"
					onChange={(e)=>{
						setFirstName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Nom"
					onChange={(e)=>{
						setLastName(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Mail"
					onChange={(e)=>{
						setEmail(e.currentTarget.value)
					}}
				/>
				<input 
					type="password" 
					placeholder="Votre Mot de passe"
					onChange={(e)=>{
					    setPassword(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Adresse"
					onChange={(e)=>{
						setAdress(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Code postal"
					onChange={(e)=>{
						setZip(e.currentTarget.value)
					}}
				/>
				<input 
					type="text" 
					placeholder="Votre Ville"
					onChange={(e)=>{
						setCity(e.currentTarget.value)
					}}
				/>
				<input type="submit" name="Enregister"/>
            </form>
        </div>
    )
}
export default Register