<script setup>
import { useCitasStore } from "../stores/useCitasStore";
import { formatCurrency } from "../helpers/index.js";
defineProps({
  service: {
    type: Object,
  },
});

const citas = useCitasStore();
</script>

<template>
  <div class="p-5 space-y-5 rounded-lg cursor-pointer" :class="citas.isServiceSelected(service._id) ? 'bg-blue-500 text-white' : 'bg-white'" @click="citas.selectedService(service)">
    <p class="text-2xl font-light">{{ service.name }}</p>
    <p class="text-4xl font-black" 
    :class="citas.isServiceSelected(service._id) ? 'text-white' : 'text-blue-600'" @click="citas.selectedService(service)">
      {{ formatCurrency(service.price) }}
    </p>
  </div>
</template>
