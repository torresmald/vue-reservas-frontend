import {defineStore} from 'pinia'
import { ref, onMounted, computed } from 'vue'
import {auth} from '../api/AuthApi.js'
import { deleteJWT } from '../helpers/index.js';
import {useRouter} from 'vue-router'

export const useUsersStore = defineStore('users', () => {
    const router = useRouter()
    const user = ref({})

    onMounted(async () => {
        const {data} = await auth()
        user.value = data
    })

    const logout = () => {
        deleteJWT()
        setTimeout(() => {
            router.push({name: 'login'})
        }, 1000);
    }
    const getUsername = computed(() =>  user.value?.name ?? user.value.name)

    return{
        user,
        getUsername,
        logout
    }
})