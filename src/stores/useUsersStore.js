import { defineStore } from 'pinia'
import { ref, onMounted, computed } from 'vue'
import { auth } from '../api/AuthApi.js'
import { deleteJWT } from '../helpers/index.js';
import { useRouter } from 'vue-router'
import { getByUser } from '../api/CitasApi.js';

export const useUsersStore = defineStore('users', () => {
    const router = useRouter()
    const user = ref({})
    const citas = ref([])
    const loading = ref(true)

    onMounted(async () => {
        try {
            const { data } = await auth()
            user.value = await data
            await getCitas()

        } catch (error) {
            console.log(error);
        } finally {
            loading.value = false
        }
    })

    const logout = () => {
        deleteJWT()
        user.value = {}
        setTimeout(() => {
            router.push({ name: 'login' })
        }, 1000);
    }

    const getCitas = async () => {
        const { data } = await getByUser(user.value._id)
        citas.value = data
    }



    const getUsername = computed(() => user.value?.name ?? user.value.name)

    const noCitas = computed(() => citas.value.length === 0)

    return {
        user,
        getUsername,
        logout,
        getCitas,
        noCitas,
        citas
    }
})