import api from '../helpers/axios.js';


export function create(data) {
    return api.post('/citas', data)
}

export function getByDate(date) {
    return api.get(`/citas?date=${date}`)
}