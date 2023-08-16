import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import ServicesApi from '../api/ServicesApi.js'
export const useServicesStore = defineStore('services', () => {

    const services = ref([])

    onMounted( async () => {
        try {
            const {data} = await ServicesApi.getServices()
            services.value = data
        } catch (error) {
            console.log(error);
        }
    })

    return {
        services
    }
})