import api from '../helpers/axios.js';


export function create(data) {
    return api.post('/citas', data)
}

export function getByDate(date) {
    return api.get(`/citas?date=${date}`)
}

export function getByUser(user) {
    return api.get(`users/${user}/citas`)
}

export function deleteCitaId(id) {
    return api.delete(`citas/${id}`)
}

export function getCitaById(id) {
    return api.get(`citas/${id}`)
}

export function updateCitaById(id, data) {
    return api.put(`citas/${id}`, data)
}