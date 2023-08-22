import { parse, formatISO, parseISO, format} from 'date-fns'
import es from 'date-fns/locale/es'

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

export const displayDate = date => {
    const newDate = parseISO(date);
    const formattedDate = format(newDate, 'PPPP', {locale: es})
    return formattedDate
}

export const convertToDate = date => {
    const newDate = new Date(date)
    const formattedDate = format(newDate, 'dd/MM/yyyy')
    return formattedDate
}