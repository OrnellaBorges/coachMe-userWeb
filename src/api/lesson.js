import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("coachme-user-token");

export const getData = async () => {
    try {
        const value = window.localStorage.getItem('coachme-basket');
        if(value !== null) {
          // value previously stored
          console.log(value)
          return value;
        }
    } catch(e) {
    // error reading value
    return e;
  }
}


export const getCoachByDistance = (datas) => {
    return axios.post(config.api_url+'/api/v1/coach/distance', datas)
	.then((response)=>{
	    return response.data
	})
	.catch((err)=>{
	    return err
	})
}

export const getOneCoach= (id) => {
   return axios.get(config.api_url+'/api/v1/coach/one/'+id)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const getAllLessonsByCoach = (coach_id) => {
    return axios.get(config.api_url+'/api/v1/lesson/all/'+coach_id)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const checkPayment = (datas) => {
    return axios.post(config.api_url+'/api/v1/lesson/payment', datas, { headers: { 'x-access-token': token }})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const validatePayment = (datas) => {
    return axios.put(config.api_url+"/api/v1/lesson/validate", datas, { headers: { 'x-access-token': token }})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}
