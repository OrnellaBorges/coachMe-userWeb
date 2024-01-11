import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {selectBasket, modifyBasket} from '../slices/basketSlice'
import {getOneCoach, getAllLessonsByCoach} from '../api/lesson'
import {
  Image,
  Video,
  Transformation,
  CloudinaryContext
} from "cloudinary-react";
import moment from 'moment';
import localization from 'moment/locale/fr';

moment.updateLocale('fr', localization);

const Detail = (props)=>{
    
    const basket = useSelector(selectBasket)
    const dispatch = useDispatch()
    
    const id = props.params.id
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [sport, setSport] = useState("")
	const [description, setDescription] = useState("");
	const [imgUrl, setImgUrl] = useState('')
	const [lessons, setLessons] = useState([]);
	const [msg, setMsg] = useState(null);
    
    const addToBasket = (basket, newLesson)=>{
        //récupération du produit findIndex
        let same = basket.findIndex((b)=> b.id === newLesson.id)
        //si il n'éxiste pas on le rajoute au panier
        if(same === -1){
            //on ajoute le nouveau cours à l'ancien panier
            let newBasket = [...basket, newLesson]
            //on enregistre le nouveau panier dans le storage
            let lsBasket = JSON.stringify(newBasket)
            window.localStorage.setItem("coachme-basket", lsBasket)
            //puis on met à jour le store de redux
            dispatch(modifyBasket(newBasket))
        } else {
            return "Attention, vous avez déjà ajouté ce cours dans votre panier"
        }
    }
    
    const removeToBasket = (basket, myLesson) =>{ 
        //suppression du produit filter
        let newBasket = basket.filter(b=> b.id !== myLesson.id)
        //on met à jour le storage + redux
        let lsBasket = JSON.stringify(newBasket)
        window.localStorage.setItem("coachme-basket", lsBasket)
        dispatch(modifyBasket(newBasket))
    }
    
    useEffect(() => {
        //on récupère les infos du coach
        getOneCoach(id)
        .then((res)=>{
            //mise à jour des states
            setFirstName(res.result.firstName)
            setLastName(res.result.lastName)
            setSport(res.result.sport)
            setDescription(res.result.description)
            setImgUrl(res.result.imageUrl)
            //on récup les lessons du coach
            getAllLessonsByCoach(res.result.id)
            .then((response)=>{
                let result = response.result
                //on boucle pour calculer le prix de la lesson par rapport au tjm
                for(let i=0; i < result.length; i++){
                    let myPrice = moment(result[i].end) - moment(result[i].start)
                    myPrice = (myPrice/3600000) * parseFloat(result[i].tjm)
                    result[i].price = myPrice
                }
                setLessons(result)
            })
            .catch((err)=>console.log(err))   
        })
        .catch((err)=>console.log(err))
                
    }, [])
    
    return (
        <div>
            <h1>{firstName} {lastName}</h1>
            {/*affichage des infos du coach*/}
            <CloudinaryContext cloudName="dt6k2cynj">
                <div>
                    <Image publicId={imgUrl}>
                        <Transformation quality="auto" fetchFormat="auto" />
                    </Image>
                </div>
            </CloudinaryContext>
            <p>Sport: {sport}</p>
            <p>Description: {description}</p>
            {msg !== null && <p>{msg}</p>}
            {/*boucle sur les lessons qu'il propose (uniquement les free)*/}
            {lessons.length > 0 && <ul className="calendar-user">
                {lessons.map((lesson)=>{
                    let isInBasket = false
                    //on vérifie si il est déjà dans le panier ou non
                    if(basket.basket.findIndex(basket => lesson.id === basket.id) !== -1) {
						isInBasket = true;
					}
                    //j'affiche les lessons qui n'ont pas encoré été reservées par quelqu'un
                    if(lesson.status === "free" && moment(lesson.start) > moment()){
                    console.log(lesson)
                        return (<li key={lesson.id}>
                            <h3>Cours de {lesson.sport}</h3>
							<p>{moment(lesson.start).format('L')}</p>
							<p>début : {moment(lesson.start).format('LT')} /  fin : {moment(lesson.end).format('LT')}</p>
							<p> Prix de cette scéance : {lesson.price} €</p>
                            {!isInBasket && <button
                                onClick={()=>{
                                    let error = addToBasket(basket.basket, lesson)
                                    isInBasket = true
                                    if(error) {
                                        setMsg(error)
                                    }
                                }}>
                                Réserver ce cours
                            </button>}
                            
                            {isInBasket && <button
                                className="red-button"
                                onClick={()=>{
                                    removeToBasket(basket.basket, lesson)
                                }}
                            >
                                Retirer ce cours
                            </button>}
                        </li>)
                    }
                })}
            </ul>}
        </div>
    )
}
export default Detail