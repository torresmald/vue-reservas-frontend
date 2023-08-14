<script setup>
  import { useRoute} from 'vue-router'
  const route = useRoute();
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink :to="{name: 'nueva-cita'}" class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-800 hover:text-white" :class="route.name === 'nueva-cita' ? 'bg-blue-600 text-white' : 'bg-white text-blue-500'">
      Servicios
    </RouterLink>
    <RouterLink :to="{name: 'detalles-cita'}" class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-800 hover:text-white" :class="route.name === 'detalles-cita' ? 'bg-blue-600 text-white' : 'bg-white text-blue-500'">
      Cita y Resumen
    </RouterLink>
  </nav>
  <RouterView />
</template>

