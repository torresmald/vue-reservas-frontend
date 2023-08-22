<script setup>
import { useUsersStore } from '../../stores/useUsersStore.js';


const user = useUsersStore()
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">Reservas</h1>
    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center">
        <p class="text-white text-right">Hola: {{ user.getUsername }}</p>
        <button
          class="bg-red-600 hover:bg-red-800 p-2 text-white uppercase text-xs font-black rounded-lg"
          @click="user.logout"
        >
          Cerrar Sesion
        </button>
      </div>
      <nav class="flex gap-2 items-center justify-end">
        <RouterLink
          :to="{ name: 'mis-citas' }"
          class="p-3 text-gray-200 uppercase font-black rounded-lg text-xs"
        >
          Mis Citas
        </RouterLink>
        <RouterLink
          :to="{ name: 'nueva-cita' }"
          class="p-3 text-gray-200 uppercase font-black rounded-lg text-xs bg-blue-600 hover:bg-blue-800"
        >
          Nueva Cita
        </RouterLink>
      </nav>
    </div>
  </div>
  <main>
    <RouterView />
  </main>
</template>
