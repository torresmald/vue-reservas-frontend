import api from '../helpers/axios.js';
import { getJWT, deleteJWT } from '../helpers/index.js';


export function auth (){
    const token = getJWT()
    return api.get('auth/user', {headers: {
        Authorization: `Bearer ${token}`
    }})
}

export function registerUser (data){
    return api.post('/auth/register', data)
}

export function confirmUser (token){
    return api.get(`auth/verify/${token}`)
}

export function loginUser (data){
    return api.post('auth/login', data)
}

export function logout (){
    deleteJWT()
}