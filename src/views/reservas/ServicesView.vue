<script setup>
import ServiceItem from "../../components/ServiceItem.vue";
import { useServicesStore } from "../../stores/useServiciosStore";
const services = useServicesStore();
</script>

<template>
  <h2 class="text-4xl font-extrabold mt-10 text-white">Servicios</h2>
  <p class="mt-5 text-white text-lg">Elige un Servicio para tu Cita</p>
  <div class="grid grid-cols-2 gap-5 mt-5">
      <ServiceItem v-for="service in services.services" :service="service"/>
  </div> 
</template>
