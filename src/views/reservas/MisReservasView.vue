<script setup>
import {useUsersStore} from '../../stores/useUsersStore.js'
import CitaDetails from '../../components/CitaDetails.vue'
const user = useUsersStore()
</script>

<template>
  <h2 class="text-4xl font-extrabold mt-10 text-white">Mis Citas</h2>
  <p class="mt-5 text-white text-lg">Administra tus próximas citas</p>
  <p v-if="user.noCitas" class="text-center text-white font-extrabold">No tienes Citas Programadas</p>
  <div class="grid grid-cols-1 gap-5 mt-10 ">
    <CitaDetails v-for=" cita in user.citas" :cita="cita"/>
    </div>
</template>
