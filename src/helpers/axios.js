import axios from "axios";
import { getJWT } from '../helpers/index.js';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


api.interceptors.request.use((config) => {
    const token = getJWT()
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api