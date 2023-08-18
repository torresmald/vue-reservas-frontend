import { parse, formatISO } from 'date-fns'

export const formatCurrency = price => {
    return Number(price).toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR'
    })
}

export const saveJWT = token => {
    localStorage.setItem('token', token)
}

export const getJWT = () => {
    const token = localStorage.getItem('token')
    return token
}

export const deleteJWT = () => {
    localStorage.removeItem('token')
}

export const formatDates = date => {
    const newDate = parse(date, 'dd/MM/yyyy', new Date())
    return formatISO(newDate)
}