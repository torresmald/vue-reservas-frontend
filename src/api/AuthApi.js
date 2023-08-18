import api from '../helpers/axios.js';




export function auth (){
    return api.get('auth/user')
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

