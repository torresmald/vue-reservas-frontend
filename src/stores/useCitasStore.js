import { defineStore } from 'pinia'
import { ref, computed, onMounted, watch } from 'vue';
import { create, getByDate, deleteCitaId, updateCitaById } from '../api/CitasApi.js'
import { inject } from "vue";
import { formatDates, convertToDate } from '../helpers/index.js'
import { useRouter } from 'vue-router'
import { useUsersStore } from './useUsersStore.js'

export const useCitasStore = defineStore('citas', () => {

    const citas = ref([]);
    const date = ref('');
    const time = ref('');
    const hours = ref([]);
    const toast = inject("toast");
    const router = useRouter()
    const citasDay = ref([])
    const citaId = ref('')

    const user = useUsersStore()

    onMounted(() => {
        const startHour = 10;
        const endHour = 21;
        for (let hour = startHour; hour <= endHour; hour++) {
            hours.value.push(hour + ':00')
        }
    })

    watch(date, async () => {
        time.value = ''
        if (date.value === '') return
        const { data } = await getByDate(date.value)
        if (citaId.value) {
            citasDay.value = data.filter(cita => cita._id !== citaId.value)
            time.value = data.filter(cita => cita._id === citaId.value)[0].time
        } else {
            citasDay.value = data
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

    const saveCita = async () => {
        const cita = {
            services: citas.value.map(item => item._id),
            date: formatDates(date.value),
            time: time.value,
            totalPay: totalPay()
        }

        if (citaId.value) {
            try {
                const { data } = await updateCitaById(citaId.value, cita)
                toast.open({
                    message: data.msg,
                    type: "success",
                });
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { data } = await create(cita)
                toast.open({
                    message: data.msg,
                    type: "success",
                });
            } catch (error) {
                console.log(error);
            }
        }

        deleteAllServices()
        user.getCitas()
        setTimeout(() => {            
            router.push({ name: 'mis-citas' })
        }, 3000);

    }

    const setSelectedCita = async cita => {
        citas.value = cita.services
        const dateConverted = convertToDate(cita.date)
        date.value = dateConverted
        time.value = cita.time
        citaId.value = cita._id
    }

    const deleteCita = async id => {
        const { data } = await deleteCitaId(id)
        toast.open({
            message: data.msg,
            type: "success",
        });
        user.citas = user.citas.filter(cita => cita._id !== id)

    }
    const deleteAllServices = () => {
        citas.value = []
        date.value = ''
        time.value = ''
        citaId.value = ''
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
        return date.value ? true : false
    })

    const disableTime = computed(() => {
        return (hour) => { return citasDay.value.find((cita) => cita.time === hour) }
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
        saveCita,
        deleteAllServices,
        isDateSelected,
        disableTime,
        deleteCita,
        setSelectedCita
    }
})