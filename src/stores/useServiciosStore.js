import { defineStore } from 'pinia'
import { ref, onMounted } from 'vue'
import ServicesApi from '../api/ServicesApi.js'
export const useStoreServices = defineStore('services', () => {

    const services = ref([])

    onMounted( async () => {
        try {
            const {data} = await ServicesApi.getServices()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    })

    return {

    }
})