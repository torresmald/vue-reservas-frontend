<script setup>
import { RouterLink } from "vue-router";
import { displayDate, formatCurrency } from "../helpers/index.js";
import { useCitasStore } from "../stores/useCitasStore";
defineProps({
  cita: {
    type: Object,
  },
});

const citas = useCitasStore()
</script>

<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-gray-500 font-black">{{ displayDate(cita.date) }}</p>
    <p class="text-gray-500 font-black">{{ cita.time }} Horas</p>
    <div v-for="service in cita.services" class="text-lg font-extrabold">
      <p>{{ service.name }}</p>
      <p>{{ formatCurrency(service.price) }}</p>
    </div>
    <p class="text-right text-2xl text-blue-500 font-bold">Total: {{ formatCurrency(cita.totalPay) }}</p>
    <div class="flex gap-2 items-center">
        <RouterLink 
        :to="{name: 'editar-cita', params: {id: cita._id}}"
        class="bg-slate-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none hover:bg-slate-800" >Editar Cita</RouterLink>
        <button class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none hover:bg-red-800" @click="citas.deleteCita(cita._id)">Eliminar Cita</button>
    </div>
  </div>
</template>
