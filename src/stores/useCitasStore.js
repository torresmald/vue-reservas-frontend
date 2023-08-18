import { defineStore } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue';
import { create, getByDate } from '../api/CitasApi.js'
import { inject } from "vue";
import { formatDates } from '../helpers/index.js'
import { useRouter } from 'vue-router'

export const useCitasStore = defineStore('citas', () => {

    const citas = ref([]);
    const date = ref('');
    const hours = ref([]);
    const time = ref('');
    const toast = inject("toast");
    const router = useRouter()
    const citasDay = ref([])

    onMounted(() => {
        const startHour = 10;
        const endHour = 21;
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    watch(date, async () => {
        time.value = ''
        if(date.value === '') return
        const {data} = await getByDate(date.value)
        citasDay.value = data
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

    const createCita = async () => {
        const cita = {
            services: citas.value.map(item => item._id),
            date: formatDates(date.value),
            time: time.value,
            totalPay: totalPay()
        }
        try {     
            const { data } = await create(cita)
            toast.open({
                message: data.msg,
                type: "success",
            });
            setTimeout(() => {
                router.push({ name: 'mis-citas' })
            }, 3000);
            deleteAllServices()
        } catch (error) {
            console.log(error);
        }
    }


    const deleteAllServices = () => {
        citas.value = []
        date.value = ''
        time.value = ''
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

    const isDateSelected = computed(() => {
        return date.value
    })

    const disableTime = computed(() => {
       return (hour) => { return citasDay.value.find((cita) => cita.time === hour)}
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
        createCita,
        deleteAllServices,
        isDateSelected,
        disableTime
    }
})