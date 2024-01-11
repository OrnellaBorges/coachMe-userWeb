import React, { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { config } from "../config";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {selectUser, connectUser} from '../slices/userSlice'
//HOC de controle des data et de la sécurité
const RequireAuth = (props) => {
    
    const user = useSelector(selectUser)
    const dispatch = useDispatch();

    
    const params = useParams();
    
    const Child = props.child;
    // gestion des state
    const [redirect, setRedirect] = useState(false);
  
    // au chargement de chaque component
    useEffect(() => {
        //si notre utilisateur n'est pas connecté
        if(user.isLogged === false){
            //on récup le token dans le locaStorage
            let token = window.localStorage.getItem("coachme-user-token")
            //si le token n'existe pas et que la route est protégée
            if(token === null && props.auth) {
                //on redirige vers le login
                setRedirect(true)
            } else {
                //on vérifie le token via l'api back
                axios.get(config.api_url+'/api/v1/user/checkToken', {headers: {'x-access-token': token}})
               .then((response)=>{
                   //si la réponse n'est pas 200
                   if(response.data.status !== 200){
                       //si la route est protégée
                       if(props.auth){
                           //on redirige vers login
                           setRedirect(true)
                       }
                   }else{
                       let myUser = response.data.user
                       myUser.token = token
                       //on connecte notre user dans le store de redux
                       dispatch(connectUser(myUser))
                   }
               })
               .catch((err)=>{
                   window.locaStorage.removeItem("coachme-user-token")
                   setRedirect(true)
               })
            }
        }
    }, [])
    
    if (redirect) {
        return <Navigate to="/login" />;
    }
    return <Child {...props} params={params} />;
}

export default RequireAuth;