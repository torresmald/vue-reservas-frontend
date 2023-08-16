import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue';


export const useCitasStore = defineStore('citas', () => {

    const citas = ref([]);
    const date = ref('');
    const hours = ref([]);
    const time = ref('');

    onMounted(() => {
        const startHour = 10;
        const endHour = 21;
        for(let hour = startHour; hour <= endHour; hour++){
            hours.value.push(hour + ':00')
        }
    })

    const selectedService = service => {
        const findedService = citas.value.find(cita => cita._id === service._id)
        if (findedService) {
            citas.value = citas.value.filter(cita => cita._id !== service._id)
        } else {
            if (citas.value.length > 3) {
                alert('Máximo de 4 citas por Día')
                return
            }
            citas.value.push(service)
        }
    }
   
    const deleteService = id => {
        citas.value = citas.value.filter(cita => cita._id !== id)
    }

    const totalPay = () => {
        return citas.value.reduce((total, acc) => total + acc.price, 0)
    }


    const createCita = () => {
        const cita = {
            service: citas.value,
            date: date.value,
            time: time.value,
            totalPay: totalPay()
        }
        
        console.log(cita);
    }


    const isServiceSelected = computed(() => {
        return (id) => citas.value.find(cita => cita._id === id)
    })

    const noServicesSelected = computed(() => {
        return citas.value.length === 0
    })

    const isValidReservation = computed(() => {
       return citas.value.length && time.value.length && date.value.length
    })

    return {
        selectedService,
        isServiceSelected,
        citas,
        date,
        hours,
        time,
        deleteService,
        totalPay,
        noServicesSelected,
        isValidReservation,
        createCita
    }
})