import api from '../helpers/axios.js';


export default {
    getServices (){
       return api.get('/services')
    }
}