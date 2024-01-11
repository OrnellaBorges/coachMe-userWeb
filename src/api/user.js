import axios from "axios";
import { config } from "../config";
const token = window.localStorage.getItem("coachme-user-token");

export const getOneUser = (user_id) => {
    return axios.get(config.api_url+'/api/v1/user/one/'+user_id)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const saveOneUser= (datas) => {
    return axios.post(config.api_url+'/api/v1/user/save', datas)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const loginOneUser = (datas) => {
    return axios.post(config.api_url+'/api/v1/user/login', datas)
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}

export const updateUser = (datas, id) => {
    return axios.put(config.api_url+'/api/v1/user/update/'+id, datas, {headers: {'x-access-token': token}})
    .then((response)=>{
        return response.data
    })
    .catch((err)=>{
        return err
    })
}